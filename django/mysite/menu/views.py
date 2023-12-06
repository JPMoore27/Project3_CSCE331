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
    """
    Generates a iterable that gives the name of every item in the menu. Used purely for demo and testing purposes
    """
    items = Items.objects.values('itemname').distinct()
    return render(request, 'item_list.html', {'items': items})

class ItemsApiView(APIView):
    """
    Api for items. All general API views work exactly the same. Get requests give jsons of all elements in table, post request adds an item to the database, delete requests delete an item with a corresponding key.
    """
    def get(self, request, *args, **kwargs):
        """
        Gives a json containing all the data for each element in items
        """
        queryset = Items.objects.all()
        serializer = ItemsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Posts an item to the items table. Everything is optional but the key
        """
        serializer = ItemsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        """
        Deletes an item entry based off its key
        """
        item_id = kwargs.get('pk')
        if 'itemid' in request.GET:
            item_id = request.GET.get('itemid')

        try:
            item = Items.objects.get(key=item_id)
        except Items.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AddonsApiView(APIView):
    """
    See api/items documentation for more details
    """
    def get(self, request, *args, **kwargs):
        queryset = Addons.objects.all()
        serializer = AddonsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = AddonsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        addon_id = kwargs.get('pk')
        try:
            addon = Addons.objects.get(pk=addon_id)
        except Addons.DoesNotExist:
            return Response({"error": "Addon not found"}, status=status.HTTP_404_NOT_FOUND)

        addon.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class MerchApiView(APIView):
    """
    See api/items documentation for more details
    """
    def get(self, request, *args, **kwargs):
        queryset = Merch.objects.all()
        serializer = MerchSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = MerchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        merch_id = kwargs.get('pk')
        try:
            merch = Merch.objects.get(pk=merch_id)
        except Merch.DoesNotExist:
            return Response({"error": "Merch not found"}, status=status.HTTP_404_NOT_FOUND)

        merch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class OrdersApiView(APIView):
    """
    See api/items documentation for more details
    """
    def get(self, request, *args, **kwargs):
        queryset = Orders.objects.all()
        serializer = OrdersSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = OrdersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        order_id = kwargs.get('pk')
        try:
            order = Orders.objects.get(pk=order_id)
        except Orders.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class StockApiView(APIView):
    """
    See api/items documentation for more details
    """
    def get(self, request, *args, **kwargs):
        queryset = Stock.objects.all()
        serializer = StockSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = StockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        stock_id = kwargs.get('pk')
        try:
            stock = Stock.objects.get(pk=stock_id)
        except Stock.DoesNotExist:
            return Response({"error": "Stock not found"}, status=status.HTTP_404_NOT_FOUND)

        stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#for testing
class YourApiView(APIView):
    """
    Dummy API for testing api requests.
    """
    def get(self, request, *args, **kwargs):
        """
        Returns a response and nothing else if the message was recieved successfully
        """
        return Response({'message': 'GET request received'}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Returns a response and nothing else if the message was recieved successfully
        """
        return Response({'message': 'POST request received'}, status=status.HTTP_201_CREATED)
