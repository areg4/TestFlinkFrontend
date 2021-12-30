from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def index(request):
    """
        Vista que renderiza el html de la única página
        @return
            - HttpResponse
    """
    return render(request,'index.html')