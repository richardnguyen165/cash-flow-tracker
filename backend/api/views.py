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
@permission_classes([IsAuthenticated])
def view_individual_transactions(_, individual_id):
  all_transactions = Transaction.objects.filter(Individual_ID=individual_id)
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

@api_view(["PUT", "OPTIONS"])
@permission_classes([AllowAny])
def create_invoice(request):
  invoice_serializer = InvoiceSerializer(data=request.data)
  if invoice_serializer.is_valid():
    invoice_serializer.save()
    return Response(invoice_serializer.data, status=status.HTTP_201_CREATED)
  return Response(invoice_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "OPTIONS"])
@permission_classes([AllowAny])
def get_individual_invoices(request, user_id):
  user = User.objects.get(id=user_id)
  print(user)
  email_of_individual = user.username
  
  all_individual_invoices = Invoice.objects.filter(
    Q(CounterParty_ID__CounterParty_Type = "INDIVIDUAL") & Q(CounterParty_ID__CounterParty_Email = email_of_individual)
  )
  invoice_serializer = InvoiceSerializer(all_individual_invoices, many = True)
  return Response(invoice_serializer.data);

# @api_view(["GET", "OPTIONS"])
# @permission_classes([AllowAny])
# def get_individual_transactions(request, individual_id):
  

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
@permission_classes([IsAuthenticated])
def get_business_invoices(request, business_id):
  business = get_object_or_404(Business.objects.select_related("User_ID"), id=business_id)
  email_of_business = business.User_ID.username

  all_business_invoices = Invoice.objects.filter(
    Q(CounterParty_ID__CounterParty_Type="BUSINESS")
    & Q(CounterParty_ID__CounterParty_Email=email_of_business)
  ).order_by("-id")
  invoice_serializer = InvoiceSerializer(all_business_invoices, many=True)
  return Response(invoice_serializer.data)

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
  all_business_transactions = (
    Transaction.objects.filter(Q(Business_ID=business_id))
    .select_related(
      "expense_pay_off__Expense_Plan_ID",
      "invoice_pay_off__Invoice_ID",
    )
    .order_by("-Transaction_Date", "-id")
  )

  rows = []
  for transaction in all_business_transactions:
    row = {
      "id": transaction.id,
      "Transaction_Date": transaction.Transaction_Date,
      "description": f"Transaction #{transaction.id}",
      "method": "Recorded in business ledger",
      "amount": "$0.00",
    }

    if hasattr(transaction, "expense_pay_off"):
      payoff = transaction.expense_pay_off
      plan_name = payoff.Expense_Plan_ID.Plan_Title if payoff.Expense_Plan_ID else "Expense Plan"
      row["description"] = f"Expense Plan Pay-Off - {plan_name}"
      row["method"] = "Expense-Pay Off"
      row["amount"] = f"-${payoff.Total_Pay}"
    elif hasattr(transaction, "invoice_pay_off"):
      payoff = transaction.invoice_pay_off
      invoice_name = payoff.Invoice_ID.Name if payoff.Invoice_ID else "Invoice"
      row["description"] = f"Invoice Pay-Off - {invoice_name}"
      row["method"] = "Invoice Pay Off"
      row["amount"] = f"-${payoff.Total_Pay}"

    rows.append(row)

  return Response(rows)

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

def business_view_expense_plans(request, business_id):
  plans = (
    Expense_Plan.objects.filter(Business_ID=business_id)
    .prefetch_related("expense_set")
    .order_by("-Expense_Plan_Due")
  )

  payload = []
  for plan in plans:
    payload.append({
      "id": plan.id,
      "title": plan.Plan_Title,
      "dueDate": str(plan.Expense_Plan_Due),
      "expenses": [
        {
          "id": expense.id,
          "cost": str(expense.Cost),
          "title": expense.Expense_Title,
          "description": expense.Description,
        }
        for expense in plan.expense_set.all()
      ],
    })

  return Response(payload)


@api_view(["GET", "POST", "OPTIONS"])
@permission_classes([IsAuthenticated])
def business_expense_plans(request, business_id):
  business = get_object_or_404(Business, id=business_id)

  if request.method == "GET":
    return business_view_expense_plans(request, business_id)

  plan_title = (request.data.get("Plan_Title") or "").strip()
  expense_plan_due = request.data.get("Expense_Plan_Due")
  occurance_number = request.data.get("Occurance_Number") or 1

  if not plan_title:
    return Response({"Plan_Title": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
  if not expense_plan_due:
    return Response({"Expense_Plan_Due": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)

  plan = Expense_Plan.objects.create(
    Business_ID=business,
    Plan_Title=plan_title,
    Expense_Plan_Due=expense_plan_due,
    Occurance_Number=occurance_number,
  )

  return Response(
    {
      "id": plan.id,
      "Plan_Title": plan.Plan_Title,
      "Expense_Plan_Due": str(plan.Expense_Plan_Due),
      "Occurance_Number": plan.Occurance_Number,
      "expenses": [],
    },
    status=status.HTTP_201_CREATED,
  )


@api_view(["GET", "POST", "OPTIONS"])
@permission_classes([IsAuthenticated])
def business_expense_plan_expenses(request, business_id, expense_plan_id):
  plan = get_object_or_404(Expense_Plan, id=expense_plan_id, Business_ID=business_id)

  if request.method == "GET":
    expenses = Expense.objects.filter(Expense_Plan_ID=plan).order_by("-Expense_Due_By", "-id")
    return Response(
      [
        {
          "id": expense.id,
          "Expense_Plan_ID": plan.id,
          "Expense_Title": expense.Expense_Title,
          "Expense_Type": expense.Expense_Type,
          "Description": expense.Description,
          "Cost": str(expense.Cost),
          "Expense_Date_Issued": str(expense.Expense_Date_Issued),
          "Expense_Due_By": str(expense.Expense_Due_By),
        }
        for expense in expenses
      ]
    )

  expense_title = (request.data.get("Expense_Title") or "").strip()
  expense_type = (request.data.get("Expense_Type") or "").strip()
  description = (request.data.get("Description") or "").strip()
  cost = request.data.get("Cost")
  due_by = request.data.get("Expense_Due_By")

  if not expense_title:
    return Response({"Expense_Title": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
  if not expense_type:
    return Response({"Expense_Type": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
  if cost is None:
    return Response({"Cost": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
  if not due_by:
    return Response({"Expense_Due_By": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)

  new_expense = Expense.objects.create(
    Expense_Plan_ID=plan,
    Expense_Title=expense_title,
    Expense_Type=expense_type,
    Description=description,
    Cost=cost,
    Expense_Due_By=due_by,
  )

  return Response(
    {
      "id": new_expense.id,
      "Expense_Plan_ID": plan.id,
      "Expense_Title": new_expense.Expense_Title,
      "Expense_Type": new_expense.Expense_Type,
      "Description": new_expense.Description,
      "Cost": str(new_expense.Cost),
      "Expense_Date_Issued": str(new_expense.Expense_Date_Issued),
      "Expense_Due_By": str(new_expense.Expense_Due_By),
    },
    status=status.HTTP_201_CREATED,
  )

@api_view(["GET", "OPTIONS"])
@permission_classes([IsAuthenticated])
def business_view_expense_plan_pay_offs(_, business_id):
  pay_off_rows = (
    Expense_Plan_Pay_Off.objects.filter(Transaction_ID__Business_ID=business_id)
    .select_related("Expense_Plan_ID")
    .order_by("-id")
  )

  payload = []
  for row in pay_off_rows:
    plan = row.Expense_Plan_ID
    if not plan:
      continue
    payload.append({
      "id": plan.id,
      "title": plan.Plan_Title,
      "dueDate": str(plan.Expense_Plan_Due),
      "totalPay": str(row.Total_Pay),
      "payOffId": row.id,
      # Keep a compatible shape with the payment modal total calculator.
      "expenses": [{"id": f"payoff-{row.id}", "cost": f"${row.Total_Pay}"}],
    })

  return Response(payload)

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
    all_employees = Employee.objects.filter(Business_ID=business_id).select_related(
      "User_ID", "Expense_Plan_ID", "Expense_ID", "Business_ID"
    )
    employee_rows = []
    for employee in all_employees:
      employee_rows.append({
        "id": employee.id,
        "user_id": employee.User_ID.id if employee.User_ID else None,
        "email": employee.User_ID.username if employee.User_ID else None,
        "user_role": employee.User_ID.User_Role if employee.User_ID else None,
        "business_id": employee.Business_ID.id if employee.Business_ID else None,
        "business_name": employee.Business_ID.Business_Name if employee.Business_ID else None,
        "role": employee.Role,
        "pay": str(employee.Pay),
        "expense_plan_id": employee.Expense_Plan_ID.id if employee.Expense_Plan_ID else None,
        "expense_id": employee.Expense_ID.id if employee.Expense_ID else None,
      })
    return Response(employee_rows)
  
  elif request.method == "POST":
    employee_data = request.data.copy()
    employee_data["Business_ID"] = business_id
    employee_serializer = EmployeeSerializer(data=employee_data)

    if employee_serializer.is_valid():
      employee_serializer.save()
      return Response(employee_serializer.data, status=201)
    return Response(employee_serializer.errors, status=400)


@api_view(["POST"])
def business_admin_invite_employee(request, business_id):
  email = (request.data.get("email") or "").strip().lower()
  if not email:
    return Response({"email": "Email is required."}, status=400)

  business = get_object_or_404(Business, id=business_id)
  user = User.objects.filter(username=email).first()

  if user is None:
    # Create a placeholder employee login account for invitation flow.
    user = User.objects.create_user(
      username=email,
      password=User.objects.make_random_password(),
      User_Role=User.Role.EMPLOYEE,
    )

  existing = Employee.objects.filter(User_ID=user).first()
  if existing:
    if existing.Business_ID_id != business_id:
      return Response(
        {"email": "This user is already assigned to another business."},
        status=400,
      )
    return Response({
      "id": existing.id,
      "user_id": existing.User_ID.id if existing.User_ID else None,
      "email": existing.User_ID.username if existing.User_ID else None,
      "user_role": existing.User_ID.User_Role if existing.User_ID else None,
      "business_id": existing.Business_ID.id if existing.Business_ID else None,
      "business_name": existing.Business_ID.Business_Name if existing.Business_ID else None,
      "role": existing.Role,
      "pay": str(existing.Pay),
      "expense_plan_id": existing.Expense_Plan_ID.id if existing.Expense_Plan_ID else None,
      "expense_id": existing.Expense_ID.id if existing.Expense_ID else None,
    }, status=200)

  employee = Employee.objects.create(
    User_ID=user,
    Business_ID=business,
    Role="Invited",
    Pay=0,
  )
  return Response({
    "id": employee.id,
    "user_id": employee.User_ID.id if employee.User_ID else None,
    "email": employee.User_ID.username if employee.User_ID else None,
    "user_role": employee.User_ID.User_Role if employee.User_ID else None,
    "business_id": employee.Business_ID.id if employee.Business_ID else None,
    "business_name": employee.Business_ID.Business_Name if employee.Business_ID else None,
    "role": employee.Role,
    "pay": str(employee.Pay),
    "expense_plan_id": employee.Expense_Plan_ID.id if employee.Expense_Plan_ID else None,
    "expense_id": employee.Expense_ID.id if employee.Expense_ID else None,
  }, status=201)

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

@api_view(["POST", "PUT", "OPTIONS"])
@permission_classes([IsAuthenticated])
def pay_off_expense_plan(request):
  expense_plan_id = request.data.get("expense_plan_id")
  total_pay = request.data.get("total_pay")
  business_id = request.data.get("business_id")

  if not expense_plan_id:
    return Response({"expense_plan_id": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
  if total_pay is None:
    return Response({"total_pay": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
  if not business_id:
    return Response({"business_id": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)

  expense_plan = get_object_or_404(Expense_Plan, id=expense_plan_id)
  business = get_object_or_404(Business, id=business_id)

  if expense_plan.Business_ID_id != business.id:
    return Response(
      {"expense_plan_id": "Expense plan does not belong to this business."},
      status=status.HTTP_400_BAD_REQUEST,
    )

  if Expense_Plan_Pay_Off.objects.filter(Expense_Plan_ID=expense_plan).exists():
    return Response(
      {"expense_plan_id": "A pay-off already exists for this expense plan."},
      status=status.HTTP_400_BAD_REQUEST,
    )

  transaction = Transaction.objects.create(Business_ID=business, Individual_ID=None)
  pay_off = Expense_Plan_Pay_Off.objects.create(
    Transaction_ID=transaction,
    Expense_Plan_ID=expense_plan,
    Total_Pay=total_pay,
  )

  return Response(
    {
      "id": pay_off.id,
      "Transaction_ID": pay_off.Transaction_ID_id,
      "Expense_Plan_ID": pay_off.Expense_Plan_ID_id,
      "Total_Pay": str(pay_off.Total_Pay),
    },
    status=status.HTTP_201_CREATED,
  )

@api_view(["POST", "PUT", "OPTIONS"])
@permission_classes([IsAuthenticated])
def pay_off_invoice(request):
  invoice_id = request.data.get("invoice_id")
  total_pay = request.data.get("total_pay")
  business_id = request.data.get("business_id")
  individual_id = request.data.get("individual_id")

  if not invoice_id:
    return Response({"invoice_id": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
  if total_pay is None:
    return Response({"total_pay": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
  if not business_id and not individual_id:
    return Response(
      {"detail": "One of business_id or individual_id is required."},
      status=status.HTTP_400_BAD_REQUEST,
    )

  invoice = get_object_or_404(Invoice, id=invoice_id)

  if Invoice_Pay_Off.objects.filter(Invoice_ID=invoice).exists():
    return Response(
      {"invoice_id": "A pay-off already exists for this invoice."},
      status=status.HTTP_400_BAD_REQUEST,
    )

  business = get_object_or_404(Business, id=business_id) if business_id else None
  individual = get_object_or_404(Individual, id=individual_id) if individual_id else None

  transaction = Transaction.objects.create(Business_ID=business, Individual_ID=individual)
  pay_off = Invoice_Pay_Off.objects.create(
    Transaction_ID=transaction,
    Invoice_ID=invoice,
    Total_Pay=total_pay,
  )

  return Response(
    {
      "id": pay_off.id,
      "Transaction_ID": pay_off.Transaction_ID_id,
      "Invoice_ID": pay_off.Invoice_ID_id,
      "Total_Pay": str(pay_off.Total_Pay),
    },
    status=status.HTTP_201_CREATED,
  )

