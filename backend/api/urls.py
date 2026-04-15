from django.urls import path
from . import views

urlpatterns = [
    # Richard - Invdividual Client
    path("indiv/profile/get/<int:user_id>", views.individual_profile),
    path("indiv/transactions/get/<int:user_id>", views.view_individual_transactions),
    path("indiv/contracts/get/<int:user_id>", views.view_individual_contracts),
    path("indiv/contracts/get/<int:user_id>/<int:contract_id>", views.view_individual_contracts_details),
    path("indiv/invoices/get/<int:user_id>", views.view_individual_invoices),
    path("indiv/invoices/get/<int:user_id>/<int:invoice_id>", views.view_individual_specific_invoice),
    
    # Richard - Business Client
    path("bus/transactions/get/<int:business_id>", views.business_view_transactions)
    
    # Cellou - Staff Client 
    
    path("staff/profile/<int:user_id>/", views.staff_profile),
    path("staff/business/<int:business_id>/employees/", views.staff_business_employees),
    path("staff/business/<int:business_id>/transactions/", views.staff_business_transactions),
    path("staff/business/<int:business_id>/expenses/", views.staff_business_expenses),
    path("staff/business/<int:business_id>/contracts/", views.staff_business_contracts),
    path("staff/business/<int:business_id>/transactions/create/", views.staff_create_transaction),
]
