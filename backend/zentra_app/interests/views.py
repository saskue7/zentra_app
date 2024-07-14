# interests/views.py
from rest_framework import viewsets
from .models import Interest
from .serializers import InterestSerializer

class InterestViewSet(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    # Implement appropriate permissions and methods as needed

