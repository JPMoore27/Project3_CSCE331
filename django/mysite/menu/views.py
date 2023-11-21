from django.shortcuts import render
from .models import Items, Addons, Merch, Orders, Stock
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ItemsSerializer, AddonsSerializer, MerchSerializer, OrdersSerializer, StockSerializer
from rest_framework.generics import ListAPIView

# Create your views here.

#for demo purposes
def item_list(request):
    items = Items.objects.values('itemname').distinct()
    return render(request, 'item_list.html', {'items': items})

class ItemsApiView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Items.objects.all()
        serializer = ItemsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddonsApiView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Addons.objects.all()
        serializer = AddonsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MerchApiView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Merch.objects.all()
        serializer = MerchSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class OrdersApiView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Orders.objects.all()
        serializer = OrdersSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StockApiView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Stock.objects.all()
        serializer = StockSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#for testing
class YourApiView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'message': 'GET request received'}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        return Response({'message': 'POST request received'}, status=status.HTTP_201_CREATED)
