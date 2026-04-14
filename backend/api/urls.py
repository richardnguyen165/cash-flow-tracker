from django.urls import path
from . import views

urlpatterns = [
    path("staff/profile/<int:user_id>/", views.staff_profile),
    path("staff/business/<int:business_id>/employees/", views.staff_business_employees),
    path("staff/business/<int:business_id>/transactions/", views.staff_business_transactions),
    path("staff/business/<int:business_id>/expenses/", views.staff_business_expenses),
    path("staff/business/<int:business_id>/contracts/", views.staff_business_contracts),
    path("staff/business/<int:business_id>/transactions/create/", views.staff_create_transaction),
]
