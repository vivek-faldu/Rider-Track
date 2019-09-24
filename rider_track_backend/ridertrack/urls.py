from django.urls import path
from .views import EventDetailsView, EventView

urlpatterns = [
    path('api/event-details/{eventId}', EventDetailsView.as_view(), name="event-details"),
    path('api/events/', EventView.as_view(), name="events"),
]