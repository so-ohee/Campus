from rest_framework import serializers
from .models import Camping, Visit


class CampingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camping
        fields = ['camping_id', 'faclt_nm', 'addr1', 'blog_cnt', 'induty', 'lct_cl', 'site_bottom_cl1', 'site_bottom_cl2', 'sbrs_cl', 'animal_cmg_cl']


class CampingAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camping
        fields = '__all__'

class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = '__all__'