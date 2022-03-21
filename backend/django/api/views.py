from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from django.shortcuts import render
from .serializers import CampingAllSerializer, CampingSerializer , VisitSerializer
from .models import Camping, Visit
from django.db.models import Q
import random
import pandas as pd

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


def choice_random(lst, n):
    '''
    lst에서 최대 n개 들어있는 랜덤 리스트 반환
    '''
    cnt = len(lst)
    random_nums = random.sample([i for i in range(cnt)], min(cnt, n))
    lst_random = []
    for i in random_nums:
        lst_random.append(lst[i])
    return lst_random