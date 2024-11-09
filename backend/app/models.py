from django.db import models


class Image(models.Model):
    img = models.ImageField(upload_to='images/')
    embedding = models.TextField()


class CheckImage(models.Model):
    img = models.ImageField(upload_to='check_images/')
    s3_url = models.URLField(max_length=200, blank=True, null=True)

    image = models.ManyToManyField(Image)
