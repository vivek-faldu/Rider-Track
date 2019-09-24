from django.contrib import admin
from .models import EventDetails, Event

# Register your models here.
admin.site.register(EventDetails)
admin.site.register(Event)