from django.shortcuts import *
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import *
from .serializers import *
from django.db.models import Q

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


# @api_view(["GET", "POST"])
# def individual_profile(request, user_id):

#   # View user profile
#   if request.method == "GET":
#     user = User.objects.get(id=user_id)
#     user_info_serializer = UserSerializer(user)
#     return Response(user_info_serializer.data)
  
#   # Edit user profile
#   elif request.method == "POST":
#     return

@api_view(["GET", "OPTIONS"])

def view_individual_transactions(_, user_id):
  all_transactions = Transaction.objects.filter(User_ID=user_id)
  indiv_transaction_serializer = TransactionSerializer(all_transactions, many=True)
  return Response(indiv_transaction_serializer.data)
  
@api_view(["GET", "OPTIONS"])
@permission_classes([IsAuthenticated])
def view_individual_contracts(_, individual_id):  
  individual = Individual.objects.get(id=individual_id)
  
  individual_email = individual.User_ID.username 
  
  all_business_contracts = Contract.objects.filter(
 Q(Contract_CounterParty_ID__CounterParty_Type="INDIVIDUAL", Contract_CounterParty_ID__CounterParty_Email=individual_email)
  )
  contract_serializer = ContractSerializer(all_business_contracts, many=True)
  print(contract_serializer)
  return Response(contract_serializer.data)

# # @api_view(["GET"])
# # def view_individual_contracts_details(_, user_id, contract_id):
#   specific_contract = Contract.objects.filter(CounterParty_ID=user_id, id = contract_id)
#   contract_serializer = ContractSerializer(specific_contract, many = False)
#   return Response(contract_serializer.data)

# @api_view(["GET"])
# def view_individual_invoices(_, user_id):
#   # Will need a join, because invoice is a transaction,
#   # and needs a user id
#   all_invoices = Invoice.objects.filter(Transaction_ID__User_id=user_id)
#   invoice_serializer = InvoiceSerializer(all_invoices, many = True)
#   return Response(invoice_serializer.data)

# @api_view(["GET"])
# def view_individual_specific_invoice(_, user_id, invoice_id):
#   # https://www.geeksforgeeks.org/python/get_object_or_404-method-in-django-models/
#   # get is for one item
  
#   specific_invoice = get_object_or_404(Invoice, Invoice.objects.prefetch_related("invoice_line_items"), Transaction_ID__User_ID=user_id, id = invoice_id)
#   invoice_serializer = InvoiceSerializer(specific_invoice, many = False)
#   return Response(invoice_serializer.data)

@api_view(["PUT", "OPTIONS"])
@permission_classes([AllowAny])
def create_contract(request):
  contract_serializer = ContractSerializer(data=request.data)
  if contract_serializer.is_valid():
    contract_serializer.save()
    return Response(contract_serializer.data, status=status.HTTP_201_CREATED)
  return Response(contract_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "OPTIONS"])
@permission_classes([AllowAny])
def get_individual_invoices(request, user_id):
  user = User.objects.filter(id=user_id) 
  email_of_individual = user.username
  
   
  all_individual_invoices = Invoice.objects.filter(
    Q(CounterParty_ID__CounterParty_Type = "INDIVIDUAL") & Q(CounterParty_ID__CounterParty_Email = email_of_individual)
  )
  invoice_serializer = InvoiceSerializer(all_individual_invoices, many = True)
  return Response(invoice_serializer.data);
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
  print(bsuiness_info_serializer.data)
  return Response(bsuiness_info_serializer.data)

@api_view(["GET", "OPTIONS"])
@permission_classes([AllowAny])
def get_business_invoices(request, user_id):
  user = User.objects.filter(id=user_id) 
  email_of_business = user.username
  
  all_business_invoices = Invoice.objects.filter(
    Q(CounterParty_ID__CounterParty_Type = "BUSINESS") & Q(CounterParty_ID__CounterParty_Email = email_of_business)
  )
  invoice_serializer = InvoiceSerializer(all_business_invoices, many = True)
  return Response(invoice_serializer.data);

# For website moderator
@api_view(["DELETE"])
def delete_business(request):
  return

@api_view(["PUT"])
def business_expenses_payment(request):
  return

@api_view(["GET", "OPTIONS"])
@permission_classes([IsAuthenticated])
def business_view_transactions(_, business_id):
  all_business_transactions = Transaction.objects.filter(
    Q(Business_ID=business_id)
  )
  business_transaction_serializer = TransactionSerializer(all_business_transactions, many=True)
  return Response(business_transaction_serializer.data)

@api_view(["GET", "OPTIONS"])
@permission_classes([IsAuthenticated])
def business_view_contracts(_, business_id):
  # gets business instance
  business = Business.objects.get(id=business_id)
  
  # gets bsiness email associated with this account
  business_email = business.User_ID.username 
  
  # .distinct() because of or which could cause duplicates
  all_business_contracts = Contract.objects.filter(
    Q(Business_ID=business_id) | Q(Contract_CounterParty_ID__CounterParty_Type="BUSINESS", Contract_CounterParty_ID__CounterParty_Email=business_email)
  ).distinct()
  contract_serializer = ContractSerializer(all_business_contracts, many=True)
  return Response(contract_serializer.data)

@api_view(["GET", "OPTIONS"])
@permission_classes([IsAuthenticated])
def business_view_expense_plans(request, business_id):
  return

@api_view(["GET", "OPTIONS"])
@permission_classes([IsAuthenticated])
def business_view_expenses(request, business_id, expense_plan_id):
  return

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

# When a business hires an employee
@api_view(["PUT", "OPTIONS"])
@permission_classes([AllowAny])
def create_staff(request):
  staff_serializer = EmployeeSerializer(data=request.data)
  if staff_serializer.is_valid():
    staff_serializer.save()
    return Response(staff_serializer.data, status=status.HTTP_201_CREATED)
  return Response(staff_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST", "OPTIONS"])
@permission_classes([AllowAny])
def create_site_admin(request):
  site_admin_serializer = SiteAdminSerializer(data=request.data)
  if site_admin_serializer.is_valid():
    site_admin_serializer.save()
    return Response(site_admin_serializer.data, status=status.HTTP_201_CREATED)
  return Response(site_admin_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST", "OPTIONS"])
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
def _get_employee_for_user(user_id, business_id=None):
  employee_query = Employee.objects.select_related("User_ID", "Business_ID")

  if business_id is not None:
    employee_query = employee_query.filter(Business_ID=business_id)

  return get_object_or_404(employee_query, User_ID=user_id)


def _require_staff_access(request, business_id):
  employee = _get_employee_for_user(request.user.id, business_id)

  if request.user.User_Role != User.Role.EMPLOYEE:
    return None, Response(
      {"detail": "Only employee accounts can use staff endpoints."},
      status=status.HTTP_403_FORBIDDEN,
    )

  return employee, None


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def staff_profile(request, user_id):
  employee = _get_employee_for_user(user_id)

  if request.user.id != employee.User_ID.id:
    return Response(
      {"detail": "You can only view your own staff profile."},
      status=status.HTTP_403_FORBIDDEN,
    )

  employee_data = EmployeeSerializer(employee).data
  business_data = BusinessSerializer(employee.Business_ID).data

  return Response({
    "employee": employee_data,
    "business": {
      "id": business_data["id"],
      "Business_Name": business_data["Business_Name"],
      "Business_Profile": business_data["Business_Profile"],
      "Business_PhoneNumber": business_data["Business_PhoneNumber"],
      "Business_Balance": business_data["Business_Balance"],
    },
    "user": {
      "id": employee.User_ID.id,
      "username": employee.User_ID.username,
      "User_Role": employee.User_ID.User_Role,
    },
  })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def staff_business_employees(request, business_id):
  employee, permission_error = _require_staff_access(request, business_id)
  if permission_error:
    return permission_error

  coworker_records = Employee.objects.filter(Business_ID=employee.Business_ID).select_related("User_ID")
  coworker_data = []

  for coworker in coworker_records:
    coworker_data.append({
      "id": coworker.id,
      "User_ID": coworker.User_ID.id if coworker.User_ID else None,
      "username": coworker.User_ID.username if coworker.User_ID else None,
      "Role": coworker.Role,
      "Pay": coworker.Pay,
    })

  return Response(coworker_data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def staff_business_transactions(request, business_id):
  employee, permission_error = _require_staff_access(request, business_id)
  if permission_error:
    return permission_error

  employee_transactions = Transaction.objects.filter(
    Business_ID=employee.Business_ID,
    User_ID=employee.User_ID,
  ).order_by("-Transaction_Date")

  transaction_serializer = TransactionSerializer(employee_transactions, many=True)
  return Response(transaction_serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def staff_business_expenses(request, business_id):
  employee, permission_error = _require_staff_access(request, business_id)
  if permission_error:
    return permission_error

  staff_expenses = Expense.objects.filter(
    Q(employees=employee) | Q(Expense_Plan_ID=employee.Expense_Plan_ID)
  ).distinct().order_by("-Expense_Due_By")

  expense_serializer = ExpenseSerializer(staff_expenses, many=True)
  return Response(expense_serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def staff_business_contracts(request, business_id):
  employee, permission_error = _require_staff_access(request, business_id)
  if permission_error:
    return permission_error

  staff_contracts = Contract.objects.filter(Business_ID=employee.Business_ID).order_by("Contract_Completion_Date")
  contract_serializer = ContractSerializer(staff_contracts, many=True)
  return Response(contract_serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def staff_create_transaction(request, business_id):
  employee, permission_error = _require_staff_access(request, business_id)
  if permission_error:
    return permission_error

  transaction_serializer = TransactionSerializer(data={
    "Business_ID": employee.Business_ID.id,
    "User_ID": employee.User_ID.id,
  })

  if transaction_serializer.is_valid():
    transaction_serializer.save()
    return Response(transaction_serializer.data, status=status.HTTP_201_CREATED)

  return Response(transaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# May's views

# BUSINESS ADMIN

def _business_admin_business_data(business):
  return {
    "id": business.id,
    "User_ID": business.User_ID.id if business.User_ID else None,
    "username": business.User_ID.username if business.User_ID else None,
    "Business_Name": business.Business_Name,
    "Business_Balance": business.Business_Balance,
    "Business_PhoneNumber": business.Business_PhoneNumber,
    "Business_AccessCode": business.Business_AccessCode,
  }

def _business_admin_counterparty_data(counterparty):
  if not counterparty:
    return None

  return {
    "CounterParty_ID": counterparty.CounterParty_ID,
    "CounterParty_Type": counterparty.CounterParty_Type,
    "CounterParty_Email": counterparty.CounterParty_Email,
  }

def _business_admin_expense_plan_data(expense_plan):
  if not expense_plan:
    return None

  return {
    "id": expense_plan.id,
    "Business_ID": expense_plan.Business_ID.id if expense_plan.Business_ID else None,
    "Plan_Title": expense_plan.Plan_Title,
    "Expense_Plan_Due": expense_plan.Expense_Plan_Due,
  }

def _business_admin_expense_data(expense):
  if not expense:
    return None

  return {
    "id": expense.id,
    "Expense_Plan_ID": _business_admin_expense_plan_data(expense.Expense_Plan_ID),
    "Cost": expense.Cost,
    "Expense_Title": expense.Expense_Title,
    "Expense_Type": expense.Expense_Type,
    "Description": expense.Description,
    "Expense_Date_Issued": expense.Expense_Date_Issued,
    "Expense_Due_By": expense.Expense_Due_By,
  }

def _business_admin_contract_data(contract):
  return {
    "id": contract.id,
    "Business_ID": contract.Business_ID.id if contract.Business_ID else None,
    "Contract_CounterParty_ID": _business_admin_counterparty_data(contract.Contract_CounterParty_ID),
    "Contract_Expense_ID": _business_admin_expense_data(contract.Contract_Expense_ID),
    "Contract_Completion_Date": contract.Contract_Completion_Date,
    "Contract_Name": contract.Contract_Name,
    "Contract_Terms": contract.Contract_Terms,
    "Contract_Status": contract.Contract_Status,
    "Contract_Type": contract.Contract_Type,
    "Contract_Cost": contract.Contract_Cost,
  }

def _business_admin_invoice_data(invoice):
  return {
    "id": invoice.id,
    "Transaction_ID": invoice.Transaction_ID.id if invoice.Transaction_ID else None,
    "Name": invoice.Name,
    "Invoice_Status": invoice.Invoice_Status,
    "Policy_Description": invoice.Policy_Description,
    "CounterParty_ID": _business_admin_counterparty_data(invoice.CounterParty_ID),
    "invoice_line_items": [
      {
        "id": line.id,
        "Invoice_ID": line.Invoice_ID.id,
        "Line_Number": line.Line_Number,
        "Cost": line.Cost,
        "Description": line.Description,
        "Quantity": line.Quantity,
        "Header": line.Header,
      }
      for line in invoice.invoice_line_items.all().order_by("Line_Number")
    ],
  }

def _business_admin_transaction_data(transaction):
  return {
    "id": transaction.id,
    "Business_ID": transaction.Business_ID.id if transaction.Business_ID else None,
    "Individual_ID": transaction.Individual_ID.id if transaction.Individual_ID else None,
    "Transaction_Date": transaction.Transaction_Date,
    "invoice": _business_admin_invoice_data(transaction.invoice) if hasattr(transaction, "invoice") else None,
    "expense_pay_off": {
      "Transaction_ID": transaction.expense_pay_off.Transaction_ID.id if transaction.expense_pay_off.Transaction_ID else None,
      "Expense_ID": transaction.expense_pay_off.Expense_ID.id if transaction.expense_pay_off.Expense_ID else None,
      "Total_Pay": transaction.expense_pay_off.Total_Pay,
    } if hasattr(transaction, "expense_pay_off") else None,
  }

def _business_admin_employee_data(employee):
  return {
    "id": employee.id,
    "User_ID": employee.User_ID.id if employee.User_ID else None,
    "username": employee.User_ID.username if employee.User_ID else None,
    "Business_ID": employee.Business_ID.id if employee.Business_ID else None,
    "Expense_Plan_ID": employee.Expense_Plan_ID.id if employee.Expense_Plan_ID else None,
    "Expense_ID": employee.Expense_ID.id if employee.Expense_ID else None,
    "Pay": employee.Pay,
    "Role": employee.Role,
  }

def _business_admin_get_counterparty(counterparty_data):
  if isinstance(counterparty_data, int):
    return get_object_or_404(CounterParty, CounterParty_ID=counterparty_data)

  if isinstance(counterparty_data, dict):
    counterparty_id = counterparty_data.get("CounterParty_ID")
    if counterparty_id:
      return get_object_or_404(CounterParty, CounterParty_ID=counterparty_id)

    return CounterParty.objects.create(
      CounterParty_Type=counterparty_data.get("CounterParty_Type"),
      CounterParty_Email=counterparty_data.get("CounterParty_Email"),
    )

  return None

def _business_admin_get_expense(business, expense_data):
  if not expense_data:
    return None

  if isinstance(expense_data, int):
    return get_object_or_404(Expense, id=expense_data)

  expense_id = expense_data.get("id") or expense_data.get("Expense_ID")
  if expense_id:
    return get_object_or_404(Expense, id=expense_id)

  plan_data = expense_data.get("Expense_Plan_ID")
  if isinstance(plan_data, int):
    expense_plan = get_object_or_404(Expense_Plan, id=plan_data, Business_ID=business)
  elif isinstance(plan_data, dict):
    expense_plan = Expense_Plan.objects.create(
      Business_ID=business,
      Plan_Title=plan_data.get("Plan_Title"),
      Expense_Plan_Due=plan_data.get("Expense_Plan_Due"),
    )
  else:
    expense_plan = None

  return Expense.objects.create(
    Expense_Plan_ID=expense_plan,
    Cost=expense_data.get("Cost", 0),
    Expense_Title=expense_data.get("Expense_Title", ""),
    Expense_Type=expense_data.get("Expense_Type", ""),
    Description=expense_data.get("Description", ""),
    Expense_Due_By=expense_data.get("Expense_Due_By"),
  )

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
  business = get_object_or_404(Business, id=business_id)

  if request.method == "GET":
    return Response(_business_admin_business_data(business))

  for field in ["Business_Name", "Business_Balance", "Business_PhoneNumber", "Business_AccessCode"]:
    if field in request.data:
      setattr(business, field, request.data[field])

  business.save()
  return Response(_business_admin_business_data(business))

@api_view(["GET"])
def business_admin_contracts(request, business_id):
  all_contracts = Contract.objects.filter(Business_ID=business_id).select_related(
    "Business_ID",
    "Contract_CounterParty_ID",
    "Contract_Expense_ID",
    "Contract_Expense_ID__Expense_Plan_ID",
  ).order_by("Contract_Completion_Date")
  return Response([_business_admin_contract_data(contract) for contract in all_contracts])

@api_view(["POST"])
def business_admin_send_contract(request, business_id):
  business = get_object_or_404(Business, id=business_id)
  counterparty = _business_admin_get_counterparty(request.data.get("Contract_CounterParty_ID"))
  expense = _business_admin_get_expense(business, request.data.get("Contract_Expense_ID"))

  if not counterparty:
    return Response({"Contract_CounterParty_ID": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)

  contract = Contract.objects.create(
    Business_ID=business,
    Contract_CounterParty_ID=counterparty,
    Contract_Expense_ID=expense,
    Contract_Completion_Date=request.data.get("Contract_Completion_Date"),
    Contract_Name=request.data.get("Contract_Name", ""),
    Contract_Terms=request.data.get("Contract_Terms", ""),
    Contract_Status=request.data.get("Contract_Status", "pending"),
    Contract_Type=request.data.get("Contract_Type", ""),
    Contract_Cost=request.data.get("Contract_Cost", 0),
  )

  return Response(_business_admin_contract_data(contract), status=status.HTTP_201_CREATED)

@api_view(["PUT"])
def business_admin_accept_contract(request, business_id, contract_id):
  contract = get_object_or_404(Contract, Business_ID=business_id, id=contract_id)
  contract.Contract_Status = "Accepted"
  contract.save()
  return Response(_business_admin_contract_data(contract))

@api_view(["PUT"])
def business_admin_reject_contract(request, business_id, contract_id):
  contract = get_object_or_404(Contract, Business_ID=business_id, id=contract_id)
  contract.Contract_Status = "Rejected"
  contract.save()
  return Response(_business_admin_contract_data(contract))

@api_view(["GET"])
def business_admin_invoices(request, business_id):
  all_invoices = Invoice.objects.filter(Transaction_ID__Business_ID=business_id).select_related(
    "Transaction_ID",
    "CounterParty_ID",
  ).prefetch_related("invoice_line_items").order_by("-Transaction_ID__Transaction_Date")
  return Response([_business_admin_invoice_data(invoice) for invoice in all_invoices])

@api_view(["GET"])
def business_admin_payments(request, business_id):
  all_transactions = Transaction.objects.filter(Business_ID=business_id).select_related(
    "Business_ID",
    "Individual_ID",
    "invoice",
    "invoice__CounterParty_ID",
    "expense_pay_off",
    "expense_pay_off__Expense_ID",
  ).prefetch_related("invoice__invoice_line_items").order_by("-Transaction_Date")
  return Response([_business_admin_transaction_data(transaction) for transaction in all_transactions])

@api_view(["GET", "POST"])
def business_admin_employees(request, business_id):
  business = get_object_or_404(Business, id=business_id)

  if request.method == "GET":
    all_employees = Employee.objects.filter(Business_ID=business).select_related(
      "User_ID",
      "Business_ID",
      "Expense_Plan_ID",
      "Expense_ID",
    ).order_by("Role", "id")
    return Response([_business_admin_employee_data(employee) for employee in all_employees])
  
  employee_data = request.data.copy()
  employee_data["Business_ID"] = business.id
  employee_serializer = EmployeeSerializer(data=employee_data)

  if employee_serializer.is_valid():
    employee = employee_serializer.save()
    return Response(_business_admin_employee_data(employee), status=status.HTTP_201_CREATED)
  return Response(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def business_admin_remove_employee(request, business_id, employee_id):
  employee = get_object_or_404(Employee, Business_ID=business_id, id=employee_id)
  employee.delete()
  return Response({"message": "Employee has been removed successfully"})

@api_view(["PUT"])
def business_admin_assign_contracts(request, business_id, employee_id):
  employee = get_object_or_404(Employee, Business_ID=business_id, id=employee_id)
  contract_id = request.data.get("contract_id") or request.data.get("Contract_ID")
  contract = get_object_or_404(Contract, Business_ID=business_id, id=contract_id)

  if not contract.Contract_Expense_ID:
    return Response(
      {"detail": "This contract does not have an expense to assign."},
      status=status.HTTP_400_BAD_REQUEST,
    )

  employee.Expense_ID = contract.Contract_Expense_ID
  employee.Expense_Plan_ID = contract.Contract_Expense_ID.Expense_Plan_ID
  employee.save()

  return Response({
    "message": "Contract expense assigned to employee successfully",
    "employee": _business_admin_employee_data(employee),
    "contract": _business_admin_contract_data(contract),
  })

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
