from django.shortcuts import render
from .models import Items

# Create your views here.

def item_list(request):
    items = Items.objects.values('itemname').distinct()
    return render(request, 'item_list.html', {'items': items})

