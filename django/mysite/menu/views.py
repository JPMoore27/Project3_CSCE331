from django.shortcuts import render
from .models import Item

# Create your views here.

def item_list(request):
    items = Item.objects.all()  # Retrieve all items from the database
    print("Items:", items)
    print("Number of items:", items.count())
    return render(request, 'item_list.html', {'items': items})

