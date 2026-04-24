from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    # Cannot read password
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "email",
            "User_Role"
        ]
    
    # https://www.django-rest-framework.org/api-guide/serializers/#field-level-validation
    
    def validate(self, data):
        if User.objects.filter(username=data["username"], password=data["password"], email=data["email"]).exists():
            raise serializers.ValidationError(f"Account already registered under {data["User_Role"]}")
        return data
        
    
    def create(self, data):
        return User.objects.create_user(
            username = data["username"],
            password = data["password"],
            email = data["email"],
            User_Role= data["User_Role"]
        )
            
class IndividualSerializer(serializers.ModelSerializer):
    userReference = UserSerializer()
    
    class Meta:
        model = Individual
        fields = [
            "userReference",
            "Individual_BirthDate",
            "Individual_Profile",
            "Individual_PhoneNumber"
        ]
    
    def validate(self, data):
        # There is an account registered under the same phone number
        if Individual.objects.filter(Individual_PhoneNumber=data["Individual_PhoneNumber"]).exists():
            raise serializers.ValidationError(f"Individual already registered under the same phone number.")            
        return data

    def create(self, data):
        # Extracts user data from consideration
        indiv_data = data.pop("user")
        # Sets it to individual client
        indiv_data["User_Role"] = User.Role.INDIVIDUAL_CLIENT
        
        # Check if user data is valid
        verify_user = UserSerializer(data=indiv_data)
        verify_user.is_valid(raise_exception=True)
        user_indiv = verify_user.save()
        
        # Create individual object, with reference to user object, and return the individual object
        finalized_individual = Individual.objects.create(
            User_ID = user_indiv,
            **data
        )
        
        return finalized_individual
    
class BusinessSerializer(serializers.ModelSerializer):
    userReference = UserSerializer()
    
    class Meta:
        model = Business
        fields = [
            "userReference",
            "Business_ID",
            "Business_Balance",
            "Business_Profile",
            "Business_PhoneNumber",
            # "Business_AdminEmail",
            "Business_AccessCode"
        ]
    
    def validate(self, data):
        # There is an account registered under the same phone number
        if Business.objects.filter(Business_PhoneNumber=data["Business_PhoneNumber"]).exists():
            raise serializers.ValidationError(f"Business already registered under the same phone number.")            
        return data

    def create(self, data):
        # Extracts user data from consideration
        business_data = data.pop("user")
        # Sets it to business client
        business_data["User_Role"] = User.Role.BUSINESS_CLIENT
        
        # Check if user data is valid
        verify_user = UserSerializer(data=business_data)
        verify_user.is_valid(raise_exception=True)
        user_indiv = verify_user.save()
        
        # Create business object, with reference to user object, and return the business object
        finalized_business = Business.objects.create(
            User_ID = user_indiv,
            **data
        )
        
        return finalized_business
        

class SiteAdminSerializer(serializers.ModelSerializer):
    userReference = UserSerializer()
    
    class Meta:
        model = Site_Admin
        fields = [
            "userReference",
            "SiteAdmin_BirthDate",
            "SiteAdmin_Profile",
            "SiteAdmin_PhoneNumber"
        ]
        
    def validate(self, data):
        # There is an account registered under the same phone number
        if Site_Admin.objects.filter(SiteAdmin_PhoneNumber=data["SiteAdmin_PhoneNumber"]).exists():
            raise serializers.ValidationError(f"Site Admin already registered under the same phone number.")            
        return data

    def create(self, data):
        # Extracts user data from consideration
        site_admin_data = data.pop("user")
        # Sets it to business client
        site_admin_data["User_Role"] = User.Role.BUSINESS_CLIENT
        
        # Check if user data is valid
        verify_user = UserSerializer(data=site_admin_data)
        verify_user.is_valid(raise_exception=True)
        user_indiv = verify_user.save()
        
        # Create business object, with reference to user object, and return the business object
        finalized_site_admin = Site_Admin.objects.create(
            User_ID = user_indiv,
            **data
        )
        
        return finalized_site_admin
        

class BusinessAdminSerializer(serializers.ModelSerializer):
    userReference = UserSerializer()
    businessReference = BusinessSerializer()
    
    class Meta:
        model = Business_Admin
        fields = [
          "userReference", 
          "BusinessAdmin_BirthDate",
          "BusinessAdmin_Profile",
          "BusinessAdmin_PhoneNumber"
        ]
    
    def validate(self, data):
        # There is an account registered under the same phone number
        if Business_Admin.objects.filter(BusinessAdmin_PhoneNumber=data["BusinessAdmin_PhoneNumber"]).exists():
            raise serializers.ValidationError(f"Business Admin already registered under the same phone number.")            
        return data
    
    def create(self, data):
        # Extracts user data from consideration
        business_user_data = data.pop("user")
        # Sets it to business client
        business_user_data["User_Role"] = User.Role.BUSINESS_CLIENT
        
        # Check if user data is valid
        verify_user = UserSerializer(data=business_user_data)
        verify_user.is_valid(raise_exception=True)
        user_indiv = verify_user.save()
        
        # Create business object, with reference to user object, and return the business object
        finalized_site_admin = Business_Admin.objects.create(
            User_ID = user_indiv,
            **data
        )
        
        return finalized_site_admin
        
        

class CounterPartySerializer(serializers.ModelSerializer):
    class Meta:
        model = CounterParty
        fields = ["CounterParty_ID"]


class BusinessClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business_Client
        fields = [
          "CounterParty_ID", 
          "Business_ID"
        ]


class IndividualClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Individual_Client
        fields = [
          "CounterParty_ID", 
          "User_ID"
        ]


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
          "id", 
          "Business_ID", 
          "User_ID", 
          "Transaction_Date"
        ]

class InvoiceLineItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceLineItem
        fields = [
            "Invoice_ID",
            "Line_Number",
            "Cost",
            "Description",
            "Quantity",
            "Header",
        ]


class InvoiceSerializer(serializers.ModelSerializer):
    invoice_line_items = InvoiceLineItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Invoice
        fields = [
          "id"
          "Transaction_ID",
          "Name", 
          "Has_Paid",           
          "Policy_Description", 
          "CounterParty_ID"
        ]


class ExpensePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense_Plan
        fields = [
          "id", 
          "Business_ID", 
          "Plan_Title", 
          "Expense_Plan_Due"
        ]


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = [
            "Expense_Plan_ID",
            "Cost",
            "Expense_Title",
            "Expense_Type",
            "Description",
            "Expense_Date_Issued",
            "Expense_Due_By",
        ]

class ExpensePayOffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense_Pay_Off
        fields = [
          "Transaction_ID",
          "Expense_ID", 
          "Total_Pay"]

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            "id",
            "User_ID",
            "Business_ID",
            "Expense_Plan_ID",
            "Expense_ID",
            "Pay",
            "Role",
        ]

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = [
            "id",
            "Business_ID",
            "CounterParty_ID",
            "Expense_ID",
            "Duration",
            "Name",
            "Terms",
        ]

class ModeratesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moderates
        fields = [
          "Site_Admin_ID", 
          "Business_ID"
        ]

class RecurringPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecurringPlan
        fields = [
          "Expense_Plan_ID", 
          "Plan_Frequency", 
          "Occurance_Number"
        ]