from django.urls import path
from .views import ItemsApiView, AddonsApiView, MerchApiView, OrdersApiView, StockApiView

urlpatterns = [
    path('items/', ItemsApiView.as_view(), name='items-list'),
    path('items/<int:pk>/', ItemsApiView.as_view(), name='items-detail'),
    
    path('addons/', AddonsApiView.as_view(), name='addons-list'),
    path('addons/<int:pk>/', AddonsApiView.as_view(), name='addons-detail'),

    path('merch/', MerchApiView.as_view(), name='merch-list'),
    path('merch/<int:pk>/', MerchApiView.as_view(), name='merch-detail'),

    path('orders/', OrdersApiView.as_view(), name='orders-list'),
    path('orders/<int:pk>/', OrdersApiView.as_view(), name='orders-detail'),

    path('stock/', StockApiView.as_view(), name='stock-list'),
    path('stock/<int:pk>/', StockApiView.as_view(), name='stock-detail'),
]