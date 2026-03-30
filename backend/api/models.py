from django.db import models

# Create your models here.
class User(models.Model):
  # Note: id is automatically added
  User_FName = models.CharField(max_length = 256)
  User_LName = models.CharField(max_length = 256)
  User_IsSiteAdmin = models.BooleanField(default = False)
  User_IsEmployed = models.BooleanField(default = False)
  User_Balance = models.FloatField(default = 0.0)
  User_Password = models.CharField(max_length= 256)
  User_BirthDate = models.DateField()
  User_Email = models.CharField(max_length = 256)
  User_Profile = models.CharField(max_length = 256)

class Business(models.Model):
  Business_Name = models.CharField(max_length = 256)
  Business_Balance = models.FloatField(default = 0.0)
  Business_Profile = models.CharField(max_length = 256)