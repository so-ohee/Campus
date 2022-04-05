from rest_framework import serializers
from .models import Camping, Visit


class CampingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camping
        fields = ['camping_id', 'faclt_nm', 'addr1', 'first_image_url', 'thema_envrn_cl']


class CampingAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camping
        fields = '__all__'

class VisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = '__all__'

class CampingMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camping
        fields = ['camping_id', 'faclt_nm', 'map_x', 'map_y']