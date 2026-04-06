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

# https://www.geeksforgeeks.org/python/autofield-django-models/
# https://dev.to/zachtylr21/model-inheritance-in-django-m0j
class Client(models.Model):
  Client_ID = models.AutoField(primary_key=True)
  
class Business_Client(Client):
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE)
  # User_ID = models.ForeignKey(User, on_delete = models.CASCADE)

class Individual_Client(Client):
  User_ID = models.ForeignKey(User, on_delete = models.CASCADE)
  
class Site_Admin(models.Model):
  User_ID = models.OneToOneField(User, on_delete = models.CASCADE)

class Business_Admin(models.Model):
  User_ID = models.OneToOneField(User, on_delete = models.CASCADE)
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE)

class Transaction(models.Model):
  # Note: Foreign Key is beest used for one to many relationships
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE)
  User_ID = models.ForeignKey(User, on_delete = models.CASCADE)
  # adds date automatically
  Transaction_Date = models.DateField(auto_now_add=True)

# Invoice and Expense Pay Off already connected to Transaction, which means we don thave
class Inovice(models.Model):
  Name = models.CharField(max_length= 256)
  Transaction_ID = models.OneToOneField(Transaction, on_delete = models.CASCADE)
  Has_Paid = models.BooleanField(default = False)
  Policy_Description = models.CharField(max_length = 256)

class Expense_Plan(models.Model):
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE)
  Plan_Title = models.CharField(max_length = 256)
  Expense_Plan_Due = models.DateField()
  
class Expense_Pay_Off(models.Model):
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE)
  Transaction_ID = models.OneToOneField(Transaction, on_delete = models.CASCADE)
  Total_Pay = models.FloatField(default = 0.0)

class Expense(models.Model):
  Expense_Plan_ID = models.ForeignKey(Expense_Plan, on_delete = models.SET_NULL, null = True, blank = True)
  Cost = models.FloatField(default = 0.0)
  Expense_Type = models.CharField(max_length = 256)
  Description = models.CharField(max_length = 256)
  Expense_Date_Issued = models.DateField(auto_now_add = True)
  Expense_Due_By = models.DateField(null = False, blank = False)

class Employee(models.Model):
  User_ID = models.ForeignKey(User, on_delete = models.CASCADE)
  Business_ID = models.ForeignKey(Business, on_delete = models.SET_NULL)
  Expense_Plan_ID = models.ForeignKey(Expense_Plan, on_delete = models.SET_NULL, null = True, blank = True)
  Expense_ID = models.ForeignKey(Expense, on_delete = models.SET_NULL, null = True, blank = True)
  Pay = models.FloatField(default = 0.0)
  Role = models.CharField(max_length = 64)

class Contract(models.Model):
  # User_ID = models.ForeignKey(User, on_delete = models.CASCADE)
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE)
  Client_ID = models.ForeignKey(Client, on_delete=models.CASCADE)
  Expense_Plan_ID = models.ForeignKey(Expense_Plan, on_delete = models.SET_NULL)
  Expense_ID = models.ForeignKey(Expense, on_delete = models.SET_NULL)
  Duration = models.PositiveIntegerField(default = 1)
  Name = models.CharField(max_length=64)
  Terms = models.CharField(max_length=5000)
  
class Moderates(models.Model):
  Site_Admin_ID = models.ForeignKey(Site_Admin, on_delete = models.CASCADE)
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE)

class RecurringPlan(models.Model):
  Expense_Plan_ID = models.ForeignKey(Expense_Plan, on_delete = models.CASCADE)
  Plan_Frequency = models.CharField(max_length = 64)
  Occurance_Number = models.PositiveIntegerField(default = 1)

class InvoiceLineItem(models.Model):
  Invoice_ID = models.ForeignKey(Inovice, on_delete = models.CASCADE)
  Line_Number = models.PositiveIntegerField()
  Cost = models.FloatField(default = 0.0)
  Description = models.CharField(max_length = 256)
  Quantity = models.PositiveIntegerField(default = 1)
  Header = models.CharField(max_length = 256)
