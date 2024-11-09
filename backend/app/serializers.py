from rest_framework import serializers
from .models import CheckImage


class CheckImageSerializer(serializers.ModelSerializer):
    s3_url = serializers.URLField(read_only=True)  # Поле только для чтения

    class Meta:
        model = CheckImage
        fields = ('img', 's3_url')

