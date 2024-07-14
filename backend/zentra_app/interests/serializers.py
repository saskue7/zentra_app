# interests/serializers.py
from rest_framework import serializers
from .models import Interest
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id','username']

class InterestSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True) 
    sender_username = serializers.CharField(write_only=True)
    receiver_username = serializers.CharField(write_only=True)

    class Meta:
        model = Interest
        fields = ['id', 'sender', 'receiver','sender_username','receiver_username', 'message', 'status', 'timestamp']
    def create(self, validated_data):
        sender_username = validated_data.pop('sender_username')
        receiver_username =    validated_data.pop('receiver_username') 
        sender = User.objects.get(username=sender_username)
        receiver = User.objects.get(username=receiver_username)
        isnt = Interest.objects.create(sender=sender,receiver=receiver,**validated_data)
        isnt.save()
        return isnt

