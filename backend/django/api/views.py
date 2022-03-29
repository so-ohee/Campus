from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from django.shortcuts import render
from .serializers import CampingAllSerializer, CampingSerializer , VisitSerializer
from .models import Camping, Visit, Survey
from django.db.models import Q
import random
import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from haversine import haversine


@api_view(('GET',))
def recommend1(request, uid):        # cf 20개, survey 10개를 받아 최대 30개 중 랜덤으로 10개 반환
    cf_ids = CF(uid)                # CF 받아오기
    survey_campings = survey(uid)   # survey 받아오기

    cf_campings = []        # cf_ids 를 캠핑 오브젝트로 변환
    for i in cf_ids:
        cf_campings.append(Camping.objects.get(pk=i))

    campings = list(set(cf_campings).union(set(survey_campings)))  # 중복 제거해서 넣기
    serializer = CampingSerializer(choice_random(campings,10), many=True)

    return Response(serializer.data)


@api_view(('GET',))
def recommend2(request, uid):       # 자기가 간 캠핑장들 태그별로 count해 가중치로 점수 계산 후 10개 추천
    visit = Visit.objects.all()
    visit_list = []                 # 자기간 간 캠핑장 저장
    for i in visit:
        if i.user_uid.pk == uid:
            visit_list.append(i.camping_id)
    if len(visit_list) == 0:        # 자기가 간 캠핑장 없으면 빈 리스트 반환
        return(Response([]))
    
    tag_dict = {}
    data = pd.read_pickle("camping_tag.pkl")    # 태그 데이터 불러오기
    data_dict = data.set_index('campingId').T.to_dict()
    for campingId in visit_list:
        for i in data_dict[campingId]['tag'].split():
            if i in tag_dict:
                tag_dict[i] += 1
            else:
                tag_dict[i] = 1

    rank_list = []          # 점수 계산해서 rank_list에 넣기
    for i in data_dict:
        lst = [i,0]
        for tag in tag_dict:
            tag_dict[tag]
            if tag in data_dict[i]['tag']:
                lst[1] += tag_dict[tag]
        rank_list.append(lst)
    rank_list.sort(key=lambda x:-x[1])
    
    ids = []
    for lst in rank_list:
        if lst[0] not in visit_list:
            ids.append(lst[0])
        if len(ids) > 30:
            break
    
    campings = []        # ids 를 캠핑 오브젝트로 변환
    for i in ids:
        campings.append(Camping.objects.get(pk=i))
    
    serializer = CampingSerializer(choice_random(campings,10), many=True)

    return Response(serializer.data)


@api_view(('GET',))
def similar(request, campingId):  # campingId를 받아와서 비슷한 캠핑장 6개 추천
    cbf_ids = CBF(campingId)
    cbf_campings = []        # cbf_ids 를 캠핑 오브젝트로 변환
    for i in cbf_ids:
        cbf_campings.append(Camping.objects.get(pk=i))
    serializer = CampingSerializer(choice_random(cbf_campings,6), many=True)
    return Response(serializer.data)


def CF(uid):
    newdict = {}                        # 유저 방문데이터 딕셔너리 작성
    visit = Visit.objects.all() 
    for i in visit:
        if i.user_uid.pk in newdict:
            newdict[i.user_uid.pk].append(i.camping_id)
        else:
            newdict[i.user_uid.pk] = [i.camping_id]
    
    if uid not in newdict:             # 유저가 방문한 캠핑장이 없으면 빈 리스트 반환
        return []

    with open("visit_dict.pkl","rb") as fr:     # data 불러오기
        data = pickle.load(fr)
    data.update(newdict)              # data 합치기

    sim = []                        # 자카드 유사도 검사 후 유사도 높은 순으로 저장
    camping = set()
    for i in data:
        jc = jaccard(data[uid],data[i])
        if 0 < jc < 1:
            sim.append([i,jc])
    sim.sort(key=lambda x:-x[1])

    mycamping = set(data[uid])          # 유사도 높은 순으로 유저가 간 캠핑장에서 내가 간 캠핑장 빼고 저장
    for i in sim:
        camping.update(set(data[i[0]]) - mycamping)
        if len(camping) > 20:           # 20개 넘으면 break
            break

    return choice_random(list(camping),20)


def survey(uid):
    if not Survey.objects.filter(pk=uid).exists():  # 설문조사 하지 않은 유저는 빈 리스트 반환
        return []

    survey = Survey.objects.get(pk=uid)

    q = Q()

    # induty
    q1 = Q()
    if survey.q1_equipment == 1:
        q1.add(Q(induty__contains='카라반'), q1.AND)
        q1.add(Q(induty__contains='글램핑'), q1.OR)
        q.add(q1, q1.AND)

    # # lct_cl
    q3 = Q()
    q3.add(Q(lct_cl__contains=survey.q3_environment), q3.AND)
    q.add(q3,q3.AND)

    # animal_cmg_cl
    q4 = Q()
    if survey.q4_pet == 0:
        q4.add(Q(animal_cmg_cl__in=['가능', '가능(소형견)']), q4.AND)
        q.add(q4,q4.AND)
    
    campings = Camping.objects.filter(q).order_by('-blog_cnt')

    # map_x, map_y
    if survey.q2_distance == 0 or survey.q2_distance == 1:
        distance_check = [0, 60, 180]
        user_location = (survey.user_x, survey.user_y)
        campings_check = []
        for camping in campings:
            distance = haversine(user_location,(camping.map_x, camping.map_y))
            if distance >= distance_check[survey.q2_distance] and distance < distance_check[survey.q2_distance + 1]:
                campings_check.append(camping)
        campings = campings_check

    campings = campings[:50]

    return choice_random(campings,10)


def CBF(campingId):
    data = pd.read_pickle("camping_tag.pkl")
    id = data.index[data['campingId'] == int(campingId)][0]
    tfidf = TfidfVectorizer(ngram_range=(1,1))
    tfidf_matrix = tfidf.fit_transform(data['tag'])
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    sim_scores = list(enumerate(cosine_sim[id]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[0:13]
    camp_indices = [idx[0] for idx in sim_scores]
    campings = []
    for i in camp_indices:
        if i == id:
            continue
        campings.append(data['campingId'][i])
    return campings


@api_view(('GET',))
def search(request):

    q = Q()

    # induty
    induty_list = ['일반야영장', '자동차야영장', '카라반', '글램핑']
    induty = request.GET.getlist('induty')
    q1 = Q()
    for i in range(len(induty)):
        if i == 0:
            q1.add(Q(induty__contains=induty_list[int(induty[i])]), q.AND)
        else:
            q1.add(Q(induty__contains=induty_list[int(induty[i])]), q.OR)
    q.add(q1, q1.AND)

    # lct
    lct_list = ['산', '숲', '계곡', '해변', '강', '도심', '섬', '호수']
    lct = request.GET.getlist('lct')
    q2 = Q()
    for i in range(len(lct)):
        if i == 0:
            q2.add(Q(lct_cl__contains=lct_list[int(lct[i])]), q.AND)
        else:
            q2.add(Q(lct_cl__contains=lct_list[int(lct[i])]), q.OR)
    q.add(q2, q2.AND)

    # sbrs
    sbrs_list = ['놀이터', '편의점', '무선인터넷', '물놀이장', '온수', '운동시설', '전기']
    sbrs = request.GET.getlist('sbrs')
    q3 = Q()
    for i in range(len(sbrs)):
        q3.add(Q(sbrs_cl__contains=sbrs_list[int(sbrs[i])]), q.AND)
    q.add(q3, q3.AND)

    # animal
    animal = request.GET.get('animal')
    q4 = Q()
    if animal == None:
        pass
    elif int(animal) == 0:
        q4.add(Q(animal_cmg_cl='가능'), q.AND)
    elif int(animal) == 1:
        q4.add(Q(animal_cmg_cl='가능'), q.AND)
        q4.add(Q(animal_cmg_cl='가능(소형견)'), q.OR)
    q.add(q4, q4.AND)

    
    # order
    order = request.GET.get('order')
    if order == '0':
        campings = Camping.objects.filter(q).order_by('-blog_cnt')
    elif order == '2':
        campings = Camping.objects.filter(q).order_by('faclt_nm')
    elif order == '1':
        x = request.GET.get('x', 126.8071876)
        y = request.GET.get('y', 35.2040949)
        myLocation = (float(x),float(y))
        campings = Camping.objects.filter(q)
        
        distance_list = []
        for camping in campings:
            lst = []
            lst.append(camping.camping_id)
            lst.append(haversine(myLocation,(camping.map_x, camping.map_y), unit = 'km'))
            distance_list.append(lst)
        distance_list.sort(key=lambda x:x[1])
        
        dict = {}
        camping_all = Camping.objects.all()
        num = 0
        for camping in camping_all:
            dict[camping.pk] = num
            num += 1

        campings = []
        for lst in distance_list:
            campings.append(camping_all[dict[lst[0]]])
    else:
        campings = Camping.objects.filter(q)

    page = int(request.GET.get('page', 1))
    campings_page = campings[(page-1)*6:page*6]  # 페이지네이션
    totalPage = (len(campings)-1)//6 + 1
    serializer = CampingSerializer(campings_page, many=True)
    return Response({'totalPage':totalPage, 'page':page, 'results': serializer.data})



# 함수 정의
def jaccard(a,b):
    '''
    a리스트와 b리스트 자카드 유사도 검사
    '''
    inter = 0
    for i in a:
        if i in b:
            inter += 1
    return inter/(len(a)+len(b)-inter)

def choice_random(lst, n):
    '''
    lst에서 최대 크기 n 랜덤 리스트 반환
    '''
    cnt = len(lst)
    random_nums = random.sample([i for i in range(cnt)], min(cnt, n))
    lst_random = []
    for i in random_nums:
        lst_random.append(lst[i])
    return lst_random








@api_view(('GET',))
def test(request):
    # dataframe 변환
    # camp = Camping.objects.all()
    # df = pd.DataFrame(camp)
    # print(df)


    # 캠핑장 하나만 가져오기
    # camp = Camping.objects.get(pk=704)
    # serializer = CampingSerializer(camp)


    # 필터링하고 랜덤으로 5개 뽑아서 가져오기
    campings = Camping.objects.filter(
        Q(do_nm='경기도'), 
        Q(induty__contains='일반야영장'),
        Q(lct_cl__contains='산')|Q(lct_cl__contains='바다'),
        ).order_by("-blog_cnt")[:100]

    campings_random = choice_random(campings, 5)
    serializer = CampingSerializer(campings_random, many=True)

    # survey test
    # serializer = CampingSerializer(survey('l6uEzsFywoOiNTu1FweAzXO85pG3'), many=True)

    # a = (127.1878004, 38.1656895)
    # b = (126.93915, 37.7689833)
    # print(haversine(a,b, unit = 'km'))

    # aa = request.GET.getlist('aa')
    # print(aa)


    return Response(serializer.data)