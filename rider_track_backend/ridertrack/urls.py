from django.urls import path
from .views import EventDetailsView


urlpatterns = [
    path('api/event-details/{eventId}', EventDetailsView.as_view(), name="event-details")
]