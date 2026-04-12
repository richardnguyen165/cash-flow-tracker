from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import authentication, permissions
from .models import *
from .serializers import *


# Create your views here.

# Richard's views

# INDIVIDUAL CLIENT

@api_view(["DELETE"])
def delete_individual(request):
  return

@api_view(["GET", "POST"])
def invidual_profile(request,id):

  # View user profile
  if request.method == "GET":
    user = User.objects.get(User_ID=id)
    user_info_serializer = UserSerializer(user)
    return Response(user_info_serializer.data)
  
  elif request.method == "POST":
    return

@api_view(["GET"])
def view_individual_transactions(request, id):
  # all_transactions = Transaction.objects.filter(User_ID=id)
  # indiv_transaction_serializer = TransactionSerializer(all_transactions, many=True)
  # return Response(indiv_transaction_serializer.data)
  return
  
@api_view(["PUT"])
def send_individual_contracts(request, id):
  return
  
@api_view(["GET"])
def view_individual_contracts(request, id):  
  return

@api_view(["GET"])
def view_individual_contracts_details(request):
  return

@api_view(["GET"])
def view_individual_invoices(request):
  return

@api_view(["GET"])
def view_individual_specific_invoice(request):
  return

@api_view(["GET"])
def view_individual_invoice_line(request):
  return

@api_view(["PUT"])
def receive_individual_invoice(request):
  return

# Assuming we are updating the contract
@api_view(["PUT"])
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

@api_view(["GET"])
def business_view_expenses(request):
  return

@api_view(["PUT"])
def business_expenses_payment(request):
  return

@api_view(["GET"])
def business_view_transactions(request):
  return

@api_view(["GET"])
def business_view_contracts(request):
  return

@api_view(["GET"])
def view_business_contracts_details(request):
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
def view_business_specific_invoice(request):
  return

@api_view(["GET"])
def view_business_invoice_line(request):
  return

@api_view(["PUT"])
def receive_business_invoice(request):
  return

@api_view(["GET"])
def view_expense_plans(request):
  return

@api_view(["GET"])
def view_expense(request):
  return

@api_view(["GET"])
def view_expense_detail(request):
  return

# Cellou's views

# May's views