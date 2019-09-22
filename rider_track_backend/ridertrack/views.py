from django.shortcuts import render
from rest_framework import generics
from .models import EventDetails
from .serializers import EventDetailsSerializer

class EventDetailsView(generics.ListAPIView):
    """
    Provides a get event with id method handler.
    """
    def get_event_details(self, eventId):
        try:
            return EventDetails.objects.get(pk=eventId)
        except EventDetails.DoesNotExist:
            raise Http404

    def get(self, request, eventId, format=None):
        event = self.get_event_details(eventId)
        serializer = EventDetailsSerializer(event)
        return Response(serializer.data)