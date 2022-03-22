from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from django.shortcuts import render
from .serializers import CampingAllSerializer, CampingSerializer , VisitSerializer
from .models import Camping, Visit
from django.db.models import Q
import random
import pandas as pd
import pickle

@api_view(('GET',))
def recommend1(request):
    pk_list = CF('rQKjkHcNBrTfsBAIRZk7vXZQ09b2')
    campings = []
    for i in pk_list:
        campings.append(Camping.objects.get(pk=i))
    serializer = CampingSerializer(choice_random(campings,5), many=True)

    return Response(serializer.data)


def CF(uid):
    with open("visit_dict.pkl","rb") as fr:     # data 불러오기
        data = pickle.load(fr)

    visit = Visit.objects.all()         # 유저 방문데이터 data에 추가
    newdict = {}
    for i in visit:
        if i.user_uid.pk in newdict:
            newdict[i.user_uid.pk].append(i.camping_id)
        else:
            newdict[i.user_uid.pk] = [i.camping_id]
    data.update(newdict)

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

    return list(camping)


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


    return Response(serializer.data)




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