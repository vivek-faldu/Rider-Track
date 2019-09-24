from rest_framework import serializers
from .models import EventDetails, Event


class EventDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventDetails
        fields = ("id","creatorId", "name", "date",
        "duration","maxParticipants","checkpoints","participants")


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ("creator_id", "event_name", "date_time", "duration", "max_participant")
