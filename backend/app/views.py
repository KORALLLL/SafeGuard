from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import CheckImageSerializer
from .services import create_check_image


@api_view(['POST'])
def upload_image(request):
    serializer = CheckImageSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    check_image = create_check_image(request.FILES['img'])
    resp = CheckImageSerializer(check_image)
    return Response({'status': 'OK', 's3_url': resp.data['s3_url']})
