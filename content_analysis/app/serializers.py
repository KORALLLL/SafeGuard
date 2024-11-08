from rest_framework import serializers
from .models import CheckImage


class CheckImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckImage
        fields = ('img',)
