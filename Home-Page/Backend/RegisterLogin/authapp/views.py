from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
import json

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)

            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            return JsonResponse({'message': 'User registered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({
                    'message': 'Login successful',
                    'username': user.username
                }, status=200)
            else:
                return JsonResponse({'error': 'Invalid username or password'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def user_logout(request):
    if request.method == 'POST':
        try:
            logout(request)
            return JsonResponse({'message': 'Logout successful'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            
            try:
                user = User.objects.get(email=email)
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                
                return JsonResponse({
                    'message': 'Proceed to password reset',
                    'uidb64': uid,
                    'token': token,
                    'email': email
                }, status=200)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Email not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def reset_password(request, uidb64, token):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_password = data.get('new_password')
            confirm_password = data.get('confirm_password')
            
            if new_password != confirm_password:
                return JsonResponse({'error': 'Passwords do not match'}, status=400)
            
            try:
                uid = urlsafe_base64_decode(uidb64).decode()
                user = User.objects.get(pk=uid)
                
                if default_token_generator.check_token(user, token):
                    user.set_password(new_password)
                    user.save()
                    return JsonResponse({
                        'message': 'Password updated successfully',
                        'username': user.username,
                        'redirect_url': '/'  # Add redirect URL
                    }, status=200)
                return JsonResponse({'error': 'Invalid token'}, status=400)
                
            except (User.DoesNotExist, ValueError, TypeError) as e:
                return JsonResponse({'error': 'Invalid user ID'}, status=400)
                
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def check_auth(request):
    if request.method == 'GET':
        try:
            if request.user.is_authenticated:
                return JsonResponse({
                    'isAuthenticated': True,
                    'username': request.user.username
                }, status=200)
            return JsonResponse({'isAuthenticated': False}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)