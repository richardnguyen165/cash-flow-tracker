from django.shortcuts import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import authentication, permissions
from .models import *
from .serializers import *


# Create your views here.

# Richard's views

# INDIVIDUAL CLIENT

@api_view(["POST"])
def create_individual(request):
  return

@api_view(["DELETE"])
def delete_individual(request):
  return

@api_view(["GET", "POST"])
def individual_profile(request, user_id):

  # View user profile
  if request.method == "GET":
    user = User.objects.get(id=user_id)
    user_info_serializer = UserSerializer(user)
    return Response(user_info_serializer.data)
  
  # Edit user profile
  elif request.method == "POST":
    return

@api_view(["GET"])
def view_individual_transactions(_, user_id):
  all_transactions = Transaction.objects.filter(User_ID=user_id)
  indiv_transaction_serializer = TransactionSerializer(all_transactions, many=True)
  return Response(indiv_transaction_serializer.data)
  
@api_view(["PUT"])
def send_individual_contracts(request, id):
  return
  
@api_view(["GET"])
def view_individual_contracts(_, user_id):  
  all_contracts = Contract.objects.filter(CounterParty_ID=user_id)
  contract_serializer = ContractSerializer(all_contracts, many = True)
  return Response(contract_serializer.data)

@api_view(["GET"])
def view_individual_contracts_details(_, user_id, contract_id):
  specific_contract = Contract.objects.filter(CounterParty_ID=user_id, id = contract_id)
  contract_serializer = ContractSerializer(specific_contract, many = False)
  return Response(contract_serializer.data)

@api_view(["GET"])
def view_individual_invoices(_, user_id):
  # Will need a join, because invoice is a transaction,
  # and needs a user id
  all_invoices = Invoice.objects.filter(Transaction_ID__User_id=user_id)
  invoice_serializer = InvoiceSerializer(all_invoices, many = True)
  return Response(invoice_serializer.data)

@api_view(["GET"])
def view_individual_specific_invoice(_, user_id, invoice_id):
  # https://www.geeksforgeeks.org/python/get_object_or_404-method-in-django-models/
  # get is for one item
  
  specific_invoice = get_object_or_404(Invoice, Invoice.objects.prefetch_related("invoice_line_items"), Transaction_ID__User_ID=user_id, id = invoice_id)
  invoice_serializer = InvoiceSerializer(specific_invoice, many = False)
  return Response(invoice_serializer.data)

@api_view(["PUT"])
def receive_individual_invoice(request):
  return

# Assuming we are updating the contract
@api_view(["DELETE"])
def individual_contracts_reject(request):
  return

# Assuming we are  updating the contract
@api_view(["PUT"])
def individual_contracts_accept(request):
  return

@api_view(["PUT"])
def individual_contracts_payment(request):
  return

'''
BUSINESS CLIENT
'''

@api_view(["PUT"])
def create_business(request):
  return

@api_view(["DELETE"])
def delete_business(request):
  return

@api_view(["PUT"])
def business_expenses_payment(request):
  return

@api_view(["GET"])
def business_view_transactions(_, business_id):
  all_transactions = Transaction.objects.filter(Buiness_id=business_id)
  indiv_transaction_serializer = TransactionSerializer(all_transactions, many=True)
  return Response(indiv_transaction_serializer.data)

@api_view(["GET"])
def business_view_contracts(request):
  
  return

@api_view(["GET"])
def business_view_contracts_details(request):
  return

# Assuming we are updating the contract
@api_view(["PUT"])
def business_contracts_reject(request):
  return

# Assuming we are  updating the contract
@api_view(["PUT"])
def business_contracts_accept(request):
  return

@api_view(["PUT"])
def business_contracts_payment(request):
  return

@api_view(["GET", "POST"])
def business_profile(request):
  
  # View user profile
  if request.method == "GET":
    return 
  
  elif request.method == "POST":
    return

@api_view(["GET"])
def business_view_specific_invoice(request):
  return

@api_view(["GET"])
def business_view_invoice_line(request):
  return

@api_view(["PUT"])
def receive_business_invoice(request):
  return

@api_view(["GET"])
def business_view_expense_plans(request):
  return

@api_view(["GET"])
def business_view_expense(request):
  return

@api_view(["GET"])
def business_view_expense_detail(request):
  return

# Cellou's views
@api_view(["GET"])
def staff_profile(request, user_id):
  return Response({"message": "staff_profile placeholder"})

@api_view(["GET"])
def staff_business_employees(request, business_id):
  return Response({"message": "staff_business_employees placeholder"})

@api_view(["GET"])
def staff_business_transactions(request, business_id):
  return Response({"message": "staff_business_transactions placeholder"})

@api_view(["GET"])
def staff_business_expenses(request, business_id):
  return Response({"message": "staff_business_expenses placeholder"})

@api_view(["GET"])
def staff_business_contracts(request, business_id):
  return Response({"message": "staff_business_contracts placeholder"})

@api_view(["POST"])
def staff_create_transaction(request, business_id):
  return Response({"message": "staff_create_transaction placeholder"})
# May's views