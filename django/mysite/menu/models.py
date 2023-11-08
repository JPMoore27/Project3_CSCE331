from django.db import models

# Create your models here.
class Item(models.Model):
    key = models.IntegerField()
    itemid = models.IntegerField()
    itemname = models.CharField(max_length=255)
    stockid = models.IntegerField()
    dairy = models.BooleanField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.itemname

class Meta:
    app_label = 'menu'  # Specify the app label
