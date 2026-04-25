from django.shortcuts import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import *
from .serializers import *

# Create your views here.

# Sources
# https://docs.djangoproject.com/en/5.2/topics/db/queries/#complex-lookups-with-q-objects (Queries in django)
# https://www.freecodecamp.org/news/what-is-q-in-django-and-why-its-super-useful/

# Richard's views

# Since we are using a view for the serializer
class CustomTokenCreator(TokenObtainPairView):
    serializer_class = TokenSerializer 

# INDIVIDUAL CLIENT

@api_view(["POST", "OPTIONS"])
@permission_classes([AllowAny])
def create_individual(request):
  print("Received request")
  user_serializer = IndividualSerializer(data=request.data)
  if user_serializer.is_valid():
    new_user = user_serializer.save()
    token = TokenSerializer.get_token(new_user.User_ID)
    return Response({
      "refresh": str(token),
      "access": str(token.access_token)
    }, status=status.HTTP_201_CREATED)
  return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "OPTIONS"])
@permission_classes([IsAuthenticated])
def get_individual(request, user_id):
  individual = Individual.objects.get(id=user_id)
  indiv_info_serializer = IndividualSerializer(individual)
  return Response(indiv_info_serializer.data)
  
# @api_view(["DELETE"])
# def delete_individual(request):
#   return

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
  
@api_view(["GET", "OPTIONS"])
@permission_classes([IsAuthenticated])
def view_individual_contracts(_, individual_id):  
  all_contracts = Contract.objects.filter(CounterParty_ID=individual_id)
  contract_serializer = ContractSerializer(all_contracts, many = True)
  return Response(contract_serializer.data)

# Assuming we are updating the contract
@api_view(["DELETE"])
def individual_contracts_reject(request):
  return

# Assuming we are  updating the contract
@api_view(["PUT"])
def individual_contracts_accept(request):
  return

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

# @api_view(["PUT"])
# def receive_individual_invoice(request):
#   return

@api_view(["PUT"])
def individual_contracts_payment(request):
  return

'''
BUSINESS CLIENT
'''

@api_view(["POST", "OPTIONS"])
@permission_classes([AllowAny])
def create_business(request):
  business_serializer = BusinessSerializer(data=request.data)
  if business_serializer.is_valid():
    new_business = business_serializer.save()
    token = TokenSerializer.get_token(new_business.User_ID)
    return Response({
      "refresh": str(token),
      "access": str(token.access_token)
    }, status=status.HTTP_201_CREATED)
  return Response(business_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "OPTIONS"])
@permission_classes([IsAuthenticated])
def get_business(request, business_id):
  business = Business.objects.get(id=business_id)
  bsuiness_info_serializer = BusinessSerializer(business)
  return Response(bsuiness_info_serializer.data)

# For website moderator
@api_view(["DELETE"])
def delete_business(request):
  return

@api_view(["PUT"])
def business_expenses_payment(request):
  return

@api_view(["GET", "OPTIONS"])
def business_view_transactions(_, business_id):
  all_transactions = Transaction.objects.filter(Buiness_id=business_id)
  indiv_transaction_serializer = TransactionSerializer(all_transactions, many=True)
  return Response(indiv_transaction_serializer.data)

@api_view(["GET"])
def business_view_contracts(request):
  return

# @api_view(["GET"])
# def business_view_contracts_details(request):
#   return

# Assuming we are updating the contract
# @api_view(["PUT"])
# def business_contracts_reject(request):
#   return

# Assuming we are  updating the contract
# @api_view(["PUT"])
# def business_contracts_accept(request):
#   return

@api_view(["PUT"])
def business_contracts_payment(request):
  return

@api_view(["GET", "POST"])
def business_profile(request):
  
  # View user profile
  if request.method == "GET":
    return 
  
  # elif request.method == "POST":
  #   return

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

# When a business hires an employee
@api_view(["PUT", "OPTIONS"])
@permission_classes([AllowAny])
def create_staff(request):
  staff_serializer = EmployeeSerializer(data=request.data)
  if staff_serializer.is_valid():
    staff_serializer.save()
    return Response(staff_serializer.data, status=status.HTTP_201_CREATED)
  return Response(staff_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT", "OPTIONS"])
@permission_classes([AllowAny])
def create_site_admin(request):
  site_admin_serializer = SiteAdminSerializer(data=request.data)
  if site_admin_serializer.is_valid():
    site_admin_serializer.save()
    return Response(site_admin_serializer.data, status=status.HTTP_201_CREATED)
  return Response(site_admin_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT", "OPTIONS"])
@permission_classes([AllowAny])
def create_business_admin(request):
  business_admin_serializer = BusinessAdminSerializer(data=request.data)
  if business_admin_serializer.is_valid():
    business_admin_serializer.save()
    return Response(business_admin_serializer.data, status=status.HTTP_201_CREATED)
  return Response(business_admin_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

# BUSINESS ADMIN

@api_view(["POST", "OPTIONS"])
@permission_classes([AllowAny])
def create_business_admin(request):
  business_admin_serializer = BusinessAdminSerializer(data=request.data)
  if business_admin_serializer.is_valid():
    business_admin = business_admin_serializer.save()
    token = TokenSerializer.get_token(business_admin.User_ID)
    return Response({
      "refresh": str(token),
      "access": str(token.access_token)
    }, status=status.HTTP_201_CREATED)
  return Response(business_admin_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT"])
def business_admin_profile(request, business_id):
    if request.method == "GET":
        business = Business.objects.get(id=business_id)
        business_info_serializer = BusinessSerializer(business)
        return Response(business_info_serializer.data)
    
    # edit business profile as business admin
    elif request.method == "PUT":
        business = Business.objects.get(id=business_id)
        business_info_serializer = BusinessSerializer(business, data=request.data)
        if business_info_serializer.is_valid():
            business_info_serializer.save()
            return Response(business_info_serializer.data)
        return Response(business_info_serializer.errors, status=400)

@api_view(["GET"])
def business_admin_contracts(request, business_id):
  all_contracts = Contract.objects.filter(Business_ID=business_id)
  contract_serializer = ContractSerializer(all_contracts, many=True)
  return Response(contract_serializer.data)

@api_view(["POST"])
def business_admin_send_contract(request, business_id):
  contract_data = request.data.copy()
  contract_data["Business_ID"] = business_id
  contract_serializer = ContractSerializer(data=contract_data)

  if contract_serializer.is_valid():
    contract_serializer.save()
    return Response(contract_serializer.data, status=201)
  return Response(contract_serializer.errors, status=400)

@api_view(["PUT"])
def business_admin_accept_contract(request, business_id, contract_id):
  contract = get_object_or_404(Contract, Business_ID=business_id, id=contract_id)
  contract.Contract_Status = "accepted"
  contract.save()
  contract_serializer = ContractSerializer(contract)
  return Response(contract_serializer.data)

@api_view(["PUT"])
def business_admin_reject_contract(request, business_id, contract_id):
  contract = get_object_or_404(Contract, Business_ID=business_id, id=contract_id)
  contract.Contract_Status = "rejected"
  contract.save()
  contract_serializer = ContractSerializer(contract)
  return Response(contract_serializer.data)

@api_view(["GET"])
def business_admin_invoices(request, business_id):
  all_invoices = Invoice.objects.filter(Transaction_ID__Business_ID=business_id)
  invoice_serializer = InvoiceSerializer(all_invoices, many=True)
  return Response(invoice_serializer.data)

@api_view(["GET"])
def business_admin_payments(request, business_id):
  all_transactions = Transaction.objects.filter(Business_ID=business_id)
  transaction_serializer = TransactionSerializer(all_transactions, many=True)
  return Response(transaction_serializer.data)

@api_view(["GET", "POST"])
def business_admin_employees(request, business_id):
  if request.method == "GET":
    all_employees = Employee.objects.filter(Business_ID=business_id)
    employee_serializer = EmployeeSerializer(all_employees, many=True)
    return Response(employee_serializer.data)
  
  elif request.method == "POST":
    employee_data = request.data.copy()
    employee_data["Business_ID"] = business_id
    employee_serializer = EmployeeSerializer(data=employee_data)

    if employee_serializer.is_valid():
      employee_serializer.save()
      return Response(employee_serializer.data, status=201)
    return Response(employee_serializer.errors, status=400)

@api_view(["DELETE"])
def business_admin_remove_employee(request, business_id, employee_id):
    employee = get_object_or_404(Employee, Business_ID=business_id, id=employee_id)
    employee.delete()
    return Response({"message": "Employee has been removed successfully"})

@api_view(["PUT"])
def business_admin_assign_contracts(request, business_id, employee_id):
  return Response({"message": "business_admin_assign_contracts placeholder"})

# SITE ADMIN

@api_view(["POST", "OPTIONS"])
@permission_classes([AllowAny])
def create_site_admin(request):
  site_admin_serializer = SiteAdminSerializer(data=request.data)
  if site_admin_serializer.is_valid():
    site_admin = site_admin_serializer.save()
    token = TokenSerializer.get_token(site_admin.User_ID)
    return Response({
      "refresh": str(token),
      "access": str(token.access_token)
    }, status=status.HTTP_201_CREATED)
  return Response(site_admin_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def site_admin_businesses(request):
  return Response({"message": "site_admin_businesses placeholder"})

@api_view(["DELETE"])
def site_admin_remove_business(request, business_id):
  return Response({"message": "site_admin_remove_business placeholder"})

@api_view(["GET"])
def site_admin_users(request):
  return Response({"message": "site_admin_users placeholder"})

@api_view(["DELETE"])
def site_admin_remove_user(request, user_id):
  return Response({"message": "site_admin_remove_user placeholder"})

@api_view(["GET"])
def site_admin_profile(request, user_id):
  return Response({"message": "site_admin_profile placeholder"})

@api_view(["GET"])
def site_admin_privileges(request):
  return Response({"message": "site_admin_privileges placeholder"})

@api_view(["PUT"])
def site_admin_grant_privileges(request, user_id):
  return Response({"message": "site_admin_grant_privileges placeholder"})

@api_view(["PUT"])
def site_admin_withdraw_privileges(request, user_id):
  return Response({"message": "site_admin_withdraw_privileges placeholder"})