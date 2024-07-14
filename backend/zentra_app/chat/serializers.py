from rest_framework import serializers
from .models import Message
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id','username']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True) 
    sender_username = serializers.CharField(write_only=True)
    receiver_username = serializers.CharField(write_only=True)

    class Meta:
        model = Message
        fields = ['id','sender', 'receiver','sender_username','receiver_username', 'content', 'timestamp']

    def create(self, validated_data):
        sender_username = validated_data.pop('sender_username')
        receiver_username =    validated_data.pop('receiver_username') 
        content = validated_data.pop('content')
        sender = User.objects.get(username=sender_username)
        receiver = User.objects.get(username=receiver_username)
        isnt = Message.objects.create(sender=sender,receiver=receiver, content=content,**validated_data)
        isnt.save()
        return isnt    

