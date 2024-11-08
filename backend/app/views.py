from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import CheckImageSerializer
from .services import create_check_image


@api_view(['POST'])
def upload_image(request):
    serializer = CheckImageSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    resp = CheckImageSerializer(create_check_image(serializer.data['img']))
    if resp.is_valid():
        return Response({'status': 'OK'})
