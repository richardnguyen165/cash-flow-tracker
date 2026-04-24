from django.urls import path
from . import views

urlpatterns = [
    # Richard - Invdividual Client
    path("indiv/put/create_user", views.create_individual),
    path("indiv/get/user/<int:user_id>", views.get_individual),
    path("indiv/profile/get/<int:user_id>", views.individual_profile),
    path("indiv/transactions/get/<int:user_id>", views.view_individual_transactions),
    path("indiv/contracts/get/<int:individual_id>", views.view_individual_contracts),
    path("indiv/contracts/get/<int:user_id>/<int:contract_id>", views.view_individual_contracts_details),
    path("indiv/invoices/get/<int:user_id>", views.view_individual_invoices),
    path("indiv/invoices/get/<int:user_id>/<int:invoice_id>", views.view_individual_specific_invoice),
    
    # Richard - Business Client
    path("bus/transactions/get/<int:business_id>", views.business_view_transactions),
    
    # Cellou - Staff Client 
    
    path("staff/profile/<int:user_id>/", views.staff_profile),
    path("staff/business/<int:business_id>/employees/", views.staff_business_employees),
    path("staff/business/<int:business_id>/transactions/", views.staff_business_transactions),
    path("staff/business/<int:business_id>/expenses/", views.staff_business_expenses),
    path("staff/business/<int:business_id>/contracts/", views.staff_business_contracts),
    path("staff/business/<int:business_id>/transactions/create/", views.staff_create_transaction),

    # May - Business Admin

    path("business/admin/<int:business_id>/profile/", views.business_admin_profile),
    path("business/admin/<int:business_id>/contracts/", views.business_admin_contracts),
    path("business/admin/<int:business_id>/contracts/send/", views.business_admin_send_contract),
    path("business/admin/<int:business_id>/contracts/<int:contract_id>/accept/", views.business_admin_accept_contract),
    path("business/admin/<int:business_id>/contracts/<int:contract_id>/reject/", views.business_admin_reject_contract),
    path("business/admin/<int:business_id>/invoices/", views.business_admin_invoices),
    path("business/admin/<int:business_id>/payments/", views.business_admin_payments),
    #employees
    path("business/admin/<int:business_id>/employees/", views.business_admin_employees),
    path("business/admin/<int:business_id>/employees/add/", views.business_admin_add_employee),
    path("business/admin/<int:business_id>/employees/<int:employee_id>/remove/", views.business_admin_remove_employee),
    path("business/admin/<int:business_id>/employees/<int:employee_id>/assign-contracts/", views.business_admin_assign_contracts),

    # May - Site Admin
     path("site/admin/users/<int:user_id>/profile/", views.site_admin_profile),
    path("site/admin/businesses/", views.site_admin_businesses),
    path("site/admin/businesses/<int:business_id>/remove/", views.site_admin_remove_business),
    path("site/admin/users/", views.site_admin_users),
    path("site/admin/users/<int:user_id>/remove/", views.site_admin_remove_user),
    path("site/admin/privileges/", views.site_admin_privileges),
    path("site/admin/users/<int:user_id>/privileges/grant/", views.site_admin_grant_privileges),
    path("site/admin/users/<int:user_id>/privileges/withdraw/", views.site_admin_withdraw_privileges),
]