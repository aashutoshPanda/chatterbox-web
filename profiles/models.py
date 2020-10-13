from django.contrib.auth.models import User
from django.db import models
from django.db.models import Q
from django.core.exceptions import ValidationError

default_profile_image = "https://www.flaticon.com/svg/static/icons/svg/847/847969.svg"
default_bio = "Hi! It's a lovely day"


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE)
    bio = models.TextField(default=default_bio, blank=True,max_length=200)
    friends = models.ManyToManyField(User, related_name='friends', blank=True)
    # this value will change everytime the profile is updated
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    profile_image_url = models.TextField(default=default_profile_image, max_length=200)
    chat_token = models.CharField(blank=True,max_length=255)

    def __str__(self):
        return str(self.user)

    def get_friends(self):
        return self.friends.all()

    def get_friends_no(self):
        return self.friends.all().count()

    def requests_received(self):
        return Relationship.objects.filter(receiver=self).all()

    def requests_sent(self):
        return Relationship.objects.filter(sender=self).all()


# tuple of tuples with (name_for_database,human_readable_form)
STATUS_CHOICES = (
    ('send', 'send'),
    ('accepted', 'accepted')
)


class RelationshipManager(models.Manager):
    def get_pending_requests_profiles(self, sender):
        pending_requests_receivers_ids = self.filter(
            sender=sender).values_list('receiver', flat=True)
        receivers = Profile.objects.filter(
            pk__in=pending_requests_receivers_ids)

        return receivers
    # with Q [models.Q] we can combine conditions with our queries
    # here any relationship with both sender receviver combination is being sent
    def get_friend_status(self, profile_a, profile_b):
        return self.filter(Q(sender=profile_a, receiver=profile_b) | Q(sender=profile_b, receiver=profile_a)).first()
        

class Relationship(models.Model):
    sender = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(
        max_length=8, choices=STATUS_CHOICES, default='send')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    objects = RelationshipManager()

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def validate_unique(self, *args, **kwargs):
        super(Relationship, self).validate_unique(*args, **kwargs)
        query1 = Relationship.objects.filter(
            sender=self.sender).filter(receiver=self.receiver)
        query2 = Relationship.objects.filter(
            sender=self.receiver).filter(receiver=self.sender)
        if ((query1 or query2) and (self.status == 'send')):
            raise ValidationError("Such a request already exists !")
        if (self.sender == self.receiver):
            raise ValidationError("Request can't be made to self")

    def make_request_accepted(self, accepter):
        if (self.status == 'accepted'):
            return True
        if (self.receiver == accepter):
            self.status = 'accepted'
            self.save()
            return True
        return False

    def __str__(self):
        return f"{self.sender} => {self.receiver} | STATUS = {self.status}"
