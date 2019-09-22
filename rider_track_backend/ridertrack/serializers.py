from rest_framework import serializers
from .models import EventDetails


class EventDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventDetails
        fields = ("id","creatorId", "name", "date",
        "duration","maxParticipants","checkpoints","participants")