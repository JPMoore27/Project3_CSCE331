from rest_framework import serializers
from .models import Items, Addons, Merch, Orders, Stock

class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = '__all__'

class AddonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addons
        fields = '__all__'

class MerchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Merch
        fields = '__all__'

class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'
