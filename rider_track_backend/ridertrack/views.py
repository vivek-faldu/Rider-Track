from django.http import Http404
from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response

from .models import EventDetails, Event
from .serializers import EventDetailsSerializer, EventSerializer


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

class EventView(generics.ListAPIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response({"events": serializer.data})



