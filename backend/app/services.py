from .models import CheckImage
from .utils import s3


def create_check_image(img):
    check_image = CheckImage.objects.create(img=img)
    file_name = check_image.img.name

    with check_image.img.open("rb") as file_obj:
        s3.upload_file(file_obj, file_name)

    url = s3.generate_link(file_name)
    check_image.s3_url = url
    check_image.save()
