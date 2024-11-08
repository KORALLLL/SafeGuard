from .models import CheckImage


def create_check_image(img):
    check_image = CheckImage.objects.create(img=img)
    return check_image
