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
  
class Site_Admin(models.Model):
  User_ID = models.OneToOneField(User, on_delete = models.CASCADE, on_update = models.CASCADE)

# class Business_Admin(models.Model):
  
class Transaction(models.Model):
  # Note: Foreign Key is beest used for one to many relationships
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE, on_update = models.CASCADE)
  User_ID = models.ForeignKey(User, on_delete = models.CASCADE, on_update = models.CASCADE)
  # adds date automatically
  Transaction_Date = models.DateField(auto_now_add=True)

# Invoice and Expense Pay Off already connected to Transaction, which means we don thave
class Inovice(models.Model):
  Name = models.CharField(max_length= 256)
  Transaction_ID = models.OneToOneField(Transaction, on_delete = models.CASCADE, on_update = models.CASCADE)
  Has_Paid = models.BooleanField(default = False)
  Policy_Description = models.CharField(max_length = 256)

# class Expense_Plan(models.Model):
  
# class Expense_Pay_Off(models.Model):

# class Expense(models.Model):

# class Employee(models.Model):

# class Moderates

# class RecurringPlan

# class Contract

# class InvoiceLineItem

# class Business_Client

# class Individual_Client