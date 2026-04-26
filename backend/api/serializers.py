from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "User_IsSiteAdmin",
            "User_IsEmployed",
            "User_Balance",
            "User_Password",
            "User_BirthDate",
            "User_Profile",
        ]

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = [
            "id",
            "Business_Name",
            "Business_Balance",
            "Business_Profile",
        ]


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


class SiteAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site_Admin
        fields = [
          "User_ID"
        ]


class BusinessAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business_Admin
        fields = [
          "User_ID", 
          "Business_ID"
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
          "id",
          "Transaction_ID",
          "Name", 
          "Has_Paid",           
          "Policy_Description", 
          "CounterParty_ID",
          "invoice_line_items",
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
