# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Addons(models.Model):
    addonid = models.IntegerField(primary_key=True)
    addonname = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=2, decimal_places=0, blank=True, null=True)
    dairy = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'addons'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


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


class MenuItem(models.Model):
    id = models.BigAutoField(primary_key=True)
    itemname = models.CharField(max_length=255)
    dairy = models.BooleanField()
    itemid = models.IntegerField()
    key = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stockid = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'menu_item'


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


class Teammembers(models.Model):
    student_name = models.TextField(primary_key=True)
    section = models.IntegerField(blank=True, null=True)
    favorite_movie = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'teammembers'
