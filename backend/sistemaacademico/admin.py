from django.contrib import admin
from .models import Student

modelsList = [Student]
admin.site.register(modelsList)