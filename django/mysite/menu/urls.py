from django.urls import path
from .views import ItemsApiView, AddonsApiView, MerchApiView, OrdersApiView, StockApiView

urlpatterns = [
    path('items/', ItemsApiView.as_view(), name='items-api'),
    path('addons/', AddonsApiView.as_view(), name='addons-api'),
    path('merch/', MerchApiView.as_view(), name='merch-api'),
    path('orders/', OrdersApiView.as_view(), name='orders-api'),
    path('stock/', StockApiView.as_view(), name='stock-api'),
]