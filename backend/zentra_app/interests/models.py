from django.db import models
from django.contrib.auth.models import User

class Interest(models.Model):
    sender = models.ForeignKey(User,related_name='sent_interests',on_delete=models.CASCADE)
    receiver = models.ForeignKey(User,related_name='received_interests',on_delete=models.CASCADE)
    message = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20,choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')],default='pending')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
       return f"Interest from {self.sender.username} to {self.receiver.username}" 

# Create your models here.
