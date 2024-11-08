from django.db import models


class Image(models.Model):
    img = models.ImageField(upload_to='images/')
    embedding = models.TextField()


class CheckImage(models.Model):
    img = models.ImageField(upload_to='check_images/')

    image = models.ManyToManyField(Image)
