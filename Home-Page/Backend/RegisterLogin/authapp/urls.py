from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register_user'),  # Registration endpoint
    path('login/', views.login_user, name='login_user'),          # Login endpoint
    path('logout/', views.user_logout, name='logout'),           # Logout endpoint (if you have it)
]