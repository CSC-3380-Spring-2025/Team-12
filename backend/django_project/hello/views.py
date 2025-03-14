from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, GhostTown Guessrs!")

# Create your views here.
