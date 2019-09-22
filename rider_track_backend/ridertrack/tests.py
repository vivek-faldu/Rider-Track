from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from .models import EventDetails
from .serializers import EventDetailsSerializer

# tests for views
class BaseViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def create_event(id="",creatorId="",name="",date="",duration="",
                    maxParticipants="",checkpoints="",participants=""):
        if id != "":
            Songs.objects.create(id=id,creatorId=creatorId,name=name,date=date,duration=duration,
                    maxParticipants=maxParticipants,checkpoints=checkpoints,participants=participants)

    def setUp(self):
        # add test data
        self.create_event("1", "100","TestEvent","","1000","1","10","10")


class GetEventDetailsTest(BaseViewTest):

    def test_get_event_details(self):
        """
        This test ensures that the created event added in the setUp method
        exist when we make a GET request to the event/id endpoint
        """
        # hit the API endpoint
        response = self.client.get(
            reverse("event-details", kwargs={"version": "v1"})
        )
        # fetch the data from db
        expected = Songs.objects.all()
        serialized = EventDetailsSerializer(expected, many=False)
        self.assertEqual(response.data, serialized.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
