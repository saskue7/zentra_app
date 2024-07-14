from rest_framework import viewsets
from .models import Message
from .serializers import MessageSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    ordering_fields = ['timestamp']
    ordering = ['-timestamp'] 
    # Implement appropriate permissions and methods as needed

