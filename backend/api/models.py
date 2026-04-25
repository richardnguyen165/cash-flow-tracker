from django.db import models
from django.contrib.auth.models import AbstractUser
import random
import string

# Create your models here.
class User(AbstractUser):
  
  # https://docs.djangoproject.com/en/6.0/ref/models/fields/
  class Role(models.TextChoices):
    INDIVIDUAL_CLIENT = "INDIVIDUAL"
    BUSINESS_CLIENT = "BUSINESS"
    BUSINESS_ADMIN = "BUSINESS_ADMIN"
    SITE_ADMIN = "SITE_ADMIN"
    EMPLOYEE = "EMPLOYEE"
    
  # password, username, and email apart of user
  User_Role = models.CharField(max_length=50, choices=Role.choices, default=Role.INDIVIDUAL_CLIENT)
  
class Individual(models.Model):
  User_ID = models.OneToOneField(User, on_delete=models.CASCADE)
  Individual_Balance = models.DecimalField(max_digits=10, decimal_places=2, default=0) 
  Individual_BirthDate = models.DateField()
  Individual_Profile = models.CharField(max_length = 256, blank = True)
  Individual_PhoneNumber = models.CharField(max_length=20)
  Individual_Name = models.CharField(max_length=256)
  
class Business(models.Model):
  def __str__(self):
    return f"{self.Business_Name}"
  
  User_ID = models.OneToOneField(User, on_delete=models.CASCADE)
  # User needs to add their own primary key
  # Business_ID = models.CharField(max_length=64)
  Business_Name = models.CharField(max_length = 256)
  Business_Balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
  Business_Profile = models.CharField(max_length = 256, blank = True)
  Business_PhoneNumber = models.CharField(max_length=20)
  Business_AccessCode = models.CharField(max_length=6, unique = True, blank = True)
  
  # https://stackoverflow.com/questions/72371106/how-to-auto-generate-a-field-value-with-the-input-field-value-in-django-model
  # Creates 6 letter access code for business automatically
  def save(self, *args, **kwargs):
    if not self.Business_AccessCode:
      code_created = False
      # https://stackoverflow.com/questions/22516805/random-six-letter-string-in-python
      while (not code_created):
        join_code = ''.join(random.sample(string.ascii_uppercase, 6))
        if not Business.objects.filter(Business_AccessCode = join_code):
          self.Business_AccessCode = join_code
          code_created = True
          
    super().save(*args, **kwargs)
  
class Site_Admin(models.Model):
  # Site admin alreadt has their id added
  User_ID = models.OneToOneField(User, on_delete = models.CASCADE, null = True, blank = True, related_name="site_admin")
  SiteAdmin_BirthDate = models.DateField()
  SiteAdmin_Profile = models.CharField(max_length = 256)
  SiteAdmin_PhoneNumber = models.CharField(max_length=20)

class Business_Admin(models.Model):
  User_ID = models.OneToOneField(User, on_delete = models.CASCADE, null = True, blank = True, related_name="business_admin")
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE, related_name="business_admin")
  BusinessAdmin_BirthDate = models.DateField()
  BusinessAdmin_Profile = models.CharField(max_length = 256)
  BusinessAdmin_PhoneNumber = models.CharField(max_length=20)
  
# THIS IS FOR CONTRACTS 

# https://www.geeksforgeeks.org/python/autofield-django-models/
# https://dev.to/zachtylr21/model-inheritance-in-django-m0j
class CounterParty(models.Model):
  CounterParty_ID = models.AutoField(primary_key=True)
  
class Business_Client(models.Model):
  CounterParty_ID = models.OneToOneField(CounterParty, on_delete=models.CASCADE, null = True, blank = True, related_name="business_client")
  Business_ID = models.OneToOneField(Business, on_delete = models.CASCADE, null = True, blank = True, related_name="business_client")
  # User_ID = models.ForeignKey(User, on_delete = models.CASCADE)

class Individual_Client(models.Model):
  CounterParty_ID = models.OneToOneField(CounterParty, on_delete=models.CASCADE, null = True, blank = True, related_name="indiv_client")
  Individual_ID = models.OneToOneField(Individual, on_delete = models.CASCADE, related_name="indiv_client")
  
class Transaction(models.Model):
  
  # Note: Foreign Key is beest used for one to many relationships
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE, related_name="transactions", null = True)
  User_ID = models.ForeignKey(User, on_delete = models.CASCADE, related_name="transactions", null = True)
  # adds date automatically
  Transaction_Date = models.DateField(auto_now_add=True)

# Invoice and Expense Pay Off already connected to Transaction, which means we don thave
class Invoice(models.Model):
  Transaction_ID = models.OneToOneField(Transaction, on_delete = models.CASCADE, null = True, blank = True, related_name="invoice")
  Name = models.CharField(max_length= 256)
  Has_Paid = models.BooleanField(default = False)
  Policy_Description = models.CharField(max_length = 256)
  CounterParty_ID = models.ForeignKey(CounterParty, on_delete=models.SET_NULL, null = True, blank = True, related_name="invoices")

class Expense_Plan(models.Model):
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE, related_name="expense_plans")
  Plan_Title = models.CharField(max_length = 256)
  Expense_Plan_Due = models.DateField()
  
class Expense(models.Model):
  Expense_Plan_ID = models.ForeignKey(Expense_Plan, on_delete = models.SET_NULL, null = True, blank = True)
  Cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
  Expense_Title = models.CharField(max_length = 256)
  Expense_Type = models.CharField(max_length = 256)
  Description = models.CharField(max_length = 256)
  Expense_Date_Issued = models.DateField(auto_now_add = True)
  Expense_Due_By = models.DateField(null = False, blank = False)
  
class Expense_Pay_Off(models.Model):
  Transaction_ID = models.OneToOneField(Transaction, on_delete = models.CASCADE, null = True, blank = True, related_name="expense_pay_off")
  Expense_ID = models.OneToOneField(Expense, on_delete = models.CASCADE, null = True, blank = True, related_name="expense_pay_off")
  Total_Pay = models.DecimalField(max_digits=10, decimal_places=2, default=0)

class Employee(models.Model):
  # Employee has their own id
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE, related_name="employees")
  Expense_Plan_ID = models.ForeignKey(Expense_Plan, on_delete = models.SET_NULL, null = True, blank = True)
  Expense_ID = models.ForeignKey(Expense, on_delete = models.SET_NULL, null = True, blank = True, related_name="employees")
  Pay = models.DecimalField(max_digits=10, decimal_places=2, default=0)
  Role = models.CharField(max_length = 64)

class Contract(models.Model):
  # User_ID = models.ForeignKey(User, on_delete = models.CASCADE)
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE, related_name="contracts")
  Contract_CounterParty_ID = models.ForeignKey(CounterParty, on_delete=models.CASCADE, related_name="contracts")
  Contract_Expense_ID = models.ForeignKey(Expense, on_delete = models.SET_NULL, null = True, blank = True, related_name="contracts")
  Contract_Completion_Date = models.DateField()
  Contract_Name = models.CharField(max_length=64)
  Contract_Terms = models.CharField(max_length=5000)
  Contract_Status = models.BooleanField()
  Contract_Type = models.CharField(max_length=64)
  
class Moderates(models.Model):
  Site_Admin_ID = models.ForeignKey(Site_Admin, on_delete = models.CASCADE, related_name="moderates")
  Business_ID = models.ForeignKey(Business, on_delete = models.CASCADE, related_name="moderates")

class RecurringPlan(models.Model):
  Expense_Plan_ID = models.ForeignKey(Expense_Plan, on_delete = models.CASCADE, related_name="recurring_plans")
  Plan_Frequency = models.CharField(max_length = 64)
  Occurance_Number = models.PositiveIntegerField(default = 1)

class InvoiceLineItem(models.Model):
  Invoice_ID = models.ForeignKey(Invoice, on_delete = models.CASCADE, related_name="invoice_line_items")
  Line_Number = models.PositiveIntegerField()
  Cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
  Description = models.CharField(max_length = 256)
  Quantity = models.PositiveIntegerField(default = 1)
  Header = models.CharField(max_length = 256)
  
  # Ensures that two invoices can each have line number 1, but not in the same invoice
  class Meta:
    unique_together = [("Invoice_ID", "Line_Number")]
