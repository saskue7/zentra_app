from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout 
from django.http import JsonResponse
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'Please provide username,pasword and email'},status= 400)
    
    if User.objects.filter(username=username).exists():
        return Response({'success':'User registered successfully'},status=400)
    
    user = User.objects.create_user(username=username,email=email,password=password)
    user.save()

    return Response({'success': "User registered successfully"},status=201)

@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username,password=password)

    if user is not None:
        login(request,user)
        return Response({"success":"User logged in successfully"})
    else:
        return Response({"error":"Invalid credentials"},status=401)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    logout(request)
    return Response({"success":"User logged out successfully"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = User.objects.all()
    user_list = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
    return Response(user_list)

