from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from django.shortcuts import render
from .serializers import CampingAllSerializer, CampingSerializer , VisitSerializer
from .models import Camping, Visit

@api_view(('GET',))
def test(request):
    camp = Camping.objects.get(pk=704)
    # serializer = CampingAllSerializer(camp)
    serializer = CampingSerializer(camp)



    visit = Visit.objects.all()
    # serializer = VisitSerializer(visit)
    
    return Response([serializer.data,serializer.data])