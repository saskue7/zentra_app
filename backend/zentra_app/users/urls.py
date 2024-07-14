from django.urls import path
from users.views import register_user,user_login,user_logout,get_users

urlpatterns = [
    path('register/',register_user,name='register'),
    path('login/',user_login,name='login'),
    path('logout/',user_logout, name = 'logout'),
    path('get_users/',get_users,name='getUsers')

]