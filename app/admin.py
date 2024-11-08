from django.contrib import admin

from .models import Image, CheckImage


@admin.register(Image)
class ClickAdmin(admin.ModelAdmin):
    list_display = (
        'img',
        'embedding',
    )
    search_fields = ('img', 'embedding')

