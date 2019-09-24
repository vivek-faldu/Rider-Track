from django.db import models

class EventDetails(models.Model):
    # creator id
    creator_id = models.CharField(max_length=255, null=False)
    #event name
    event_name = models.CharField(max_length=255, null=False)
    #date and time
    date_time = models.DateTimeField()
    #duration of the event
    duration = models.IntegerField()
    #maximum number of participants
    max_participant = models.IntegerField()
    #checkpoints through out event map
    checkpoints = list()
    #participants registered for the event
    participants = list()

    def __str__(self):
        return "{} - {}".format(self.creatorId,self.name,self.date,self.duration,
        self.maxParticipants,self.checkpoints,self.participants)


class Event(models.Model):

    # creator id
    creator_id = models.CharField(max_length=255, null=False)
    # event name
    event_name = models.CharField(max_length=255, null=False)
    # date and time
    date_time = models.DateTimeField()
    # duration of the event
    duration = models.IntegerField()
    # maximum number of participants
    max_participant = models.IntegerField()
    # checkpoints through out event map
#    checkpoints = models.ManyToManyField(Checkpoint)
    # participants registered for the event
 #   participants = models.ManyToManyField(Participant)

    def __str__(self):
        return self.event_name
