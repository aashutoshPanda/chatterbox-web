from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    friends = models.ManyToManyField(User, related_name='friends', blank=True)
    # this value will change everytime the profile is updated
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

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


class Relationship(models.Model):
    sender = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='receiver')
    status = models.CharField(
        max_length=8, choices=STATUS_CHOICES, default='sent')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

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
