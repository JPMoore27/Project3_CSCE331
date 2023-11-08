# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Items(models.Model):
    key = models.IntegerField(primary_key=True)
    itemid = models.IntegerField(blank=True, null=True)
    itemname = models.TextField(blank=True, null=True)
    stockid = models.IntegerField(blank=True, null=True)
    dairy = models.BooleanField(blank=True, null=True)
    price = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'items'

class Addons(models.Model):
    addonid = models.IntegerField(primary_key=True)
    addonname = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=2, decimal_places=0, blank=True, null=True)
    dairy = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'addons'


class Merch(models.Model):
    merchid = models.IntegerField(primary_key=True)
    merchname = models.TextField(blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'merch'

class Orders(models.Model):
    orderid = models.IntegerField(primary_key=True)
    itemid = models.IntegerField(blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    time = models.DateTimeField(blank=True, null=True)
    customername = models.TextField(blank=True, null=True)
    takeout = models.BooleanField(blank=True, null=True)
    price = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'orders'

class Stock(models.Model):
    stockid = models.IntegerField(primary_key=True)
    stockname = models.TextField(blank=True, null=True)
    amount = models.DecimalField(max_digits=4, decimal_places=0, blank=True, null=True)
    unit = models.TextField(blank=True, null=True)
    use = models.DecimalField(max_digits=4, decimal_places=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stock'