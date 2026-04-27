# api/management/commands/seed_data.py
from django.core.management.base import BaseCommand
from api.models import *
from datetime import date


# sample ai generated data
class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        user_individual1 = User.objects.create_user(
            username="john@gmail.com",
            password="Pass1234!",
            User_Role="INDIVIDUAL"
        )
        user_individual2 = User.objects.create_user(
            username="sara@gmail.com",
            password="Pass1234!",
            User_Role="INDIVIDUAL"
        )
        user_business1 = User.objects.create_user(
            username="ops@northshore.com",
            password="Pass1234!",
            User_Role="BUSINESS"
        )
        user_business2 = User.objects.create_user(
            username="ops@atlascap.com",
            password="Pass1234!",
            User_Role="BUSINESS"
        )
        user_admin = User.objects.create_user(
            username="admin@northshore.com",
            password="Pass1234!",
            User_Role="BUSINESS_ADMIN"
        )
        user_employee1 = User.objects.create_user(
            username="maya@northshore.com",
            password="Pass1234!",
            User_Role="EMPLOYEE"
        )
        user_employee2 = User.objects.create_user(
            username="james@northshore.com",
            password="Pass1234!",
            User_Role="EMPLOYEE"
        )
        user_employee3 = User.objects.create_user(
            username="priya@northshore.com",
            password="Pass1234!",
            User_Role="EMPLOYEE"
        )
        
        john = Individual.objects.create(
            User_ID=user_individual1,
            Individual_Balance=15000.00,
            Individual_BirthDate=date(1990, 5, 14),
            Individual_PhoneNumber="+1 403-555-1001",
            Individual_Name="John Carter"
        )
        sara = Individual.objects.create(
            User_ID=user_individual2,
            Individual_Balance=8200.00,
            Individual_BirthDate=date(1995, 8, 22),
            Individual_PhoneNumber="+1 403-555-1002",
            Individual_Name="Sara Lenz"
        )

        northshore = Business.objects.create(
            User_ID=user_business1,
            Business_Name="Northshore Capital",
            Business_Balance=500000.00,
            Business_PhoneNumber="+1 403-555-2001",
        )
        atlas = Business.objects.create(
            User_ID=user_business2,
            Business_Name="Atlas Capital",
            Business_Balance=320000.00,
            Business_PhoneNumber="+1 403-555-2002",
        )
        
        Business_Admin.objects.create(
            User_ID=user_admin,
            Business_ID=northshore,
            BusinessAdmin_Name="Michael Scott",
            BusinessAdmin_BirthDate=date(1975, 3, 15),
            BusinessAdmin_PhoneNumber="+1 403-555-3001"
        )

        plan_northshore = Expense_Plan.objects.create(
            Business_ID=northshore,
            Plan_Title="Q2 Advisory Operations",
            Expense_Plan_Due=date(2026, 6, 30),
            Occurance_Number=3
        )
        plan_atlas = Expense_Plan.objects.create(
            Business_ID=atlas,
            Plan_Title="Q2 Client Services",
            Expense_Plan_Due=date(2026, 6, 30),
            Occurance_Number=2
        )

        expense1 = Expense.objects.create(
            Expense_Plan_ID=plan_northshore,
            Cost=5200.00,
            Expense_Title="Staff Payroll - April",
            Expense_Type="Payroll",
            Description="Monthly payroll for advisory staff",
            Expense_Due_By=date(2026, 4, 30)
        )
        expense2 = Expense.objects.create(
            Expense_Plan_ID=plan_northshore,
            Cost=1800.00,
            Expense_Title="Office Supplies",
            Expense_Type="Operations",
            Description="Quarterly office supply restock",
            Expense_Due_By=date(2026, 5, 15)
        )
        expense3 = Expense.objects.create(
            Expense_Plan_ID=plan_atlas,
            Cost=3400.00,
            Expense_Title="Client Meetings Travel",
            Expense_Type="Travel",
            Description="Travel expenses for Q2 client meetings",
            Expense_Due_By=date(2026, 5, 31)
        )

        Employee.objects.create(
            User_ID=user_employee1,
            Business_ID=northshore,
            Expense_Plan_ID=plan_northshore,
            Expense_ID=expense1,
            Pay=2100.00,
            Role="Operations Analyst"
        )
        Employee.objects.create(
            User_ID=user_employee2,
            Business_ID=northshore,
            Expense_Plan_ID=plan_northshore,
            Expense_ID=expense2,
            Pay=2400.00,
            Role="Financial Advisor"
        )
        Employee.objects.create(
            User_ID=user_employee3,
            Business_ID=northshore,
            Expense_Plan_ID=plan_northshore,
            Expense_ID=expense1,
            Pay=1900.00,
            Role="Client Relations"
        )

        cp_john = CounterParty.objects.create(
            CounterParty_Type="INDIVIDUAL",
            CounterParty_Email="john@gmail.com"
        )
        cp_sara = CounterParty.objects.create(
            CounterParty_Type="INDIVIDUAL",
            CounterParty_Email="sara@gmail.com"
        )
        cp_atlas = CounterParty.objects.create(
            CounterParty_Type="BUSINESS",
            CounterParty_Email="ops@atlascap.com"
        )

        Contract.objects.create(
            Business_ID=northshore,
            Contract_CounterParty_ID=cp_john,
            Contract_Expense_ID=expense1,
            Contract_Completion_Date=date(2026, 5, 23),
            Contract_Name="Capital Advisory Agreement",
            Contract_Terms="Northshore Capital will provide monthly advisory services to the client including portfolio reviews, financial planning sessions, and quarterly reporting. Payment is due within 30 days of invoice.",
            Contract_Status="Active",
            Contract_Type="INDIVIDUAL",
            Contract_Cost=84210.00
        )
        Contract.objects.create(
            Business_ID=northshore,
            Contract_CounterParty_ID=cp_sara,
            Contract_Expense_ID=expense2,
            Contract_Completion_Date=date(2026, 8, 30),
            Contract_Name="Equity Participation Clause",
            Contract_Terms="This clause describes the terms under which the client may participate in an equity-based financial arrangement with Northshore Capital.",
            Contract_Status="In Review",
            Contract_Type="INDIVIDUAL",
            Contract_Cost=250000.00
        )
        Contract.objects.create(
            Business_ID=northshore,
            Contract_CounterParty_ID=cp_atlas,
            Contract_Expense_ID=expense3,
            Contract_Completion_Date=date(2026, 4, 30),
            Contract_Name="Commercial Escrow Agreement",
            Contract_Terms="Funds will be held and released under the terms of this escrow agreement between Northshore Capital and Atlas Capital.",
            Contract_Status="Active",
            Contract_Type="BUSINESS",
            Contract_Cost=42500.00
        )
        
        txn_john = Transaction.objects.create(
            Business_ID=northshore,
            Individual_ID=john,
        )
        txn_sara = Transaction.objects.create(
            Business_ID=northshore,
            Individual_ID=sara,
        )
        txn_business = Transaction.objects.create(
            Business_ID=northshore,
            Individual_ID=None,
        )

        invoice_john = Invoice.objects.create(
            Transaction_ID=txn_john,
            Name="April Advisory Invoice",
            Invoice_Status="Unpaid",
            Policy_Description="Payment due within 30 days of invoice date.",
            CounterParty_ID=cp_john,
            Invoice_Type="INDIVIDUAL"
        )
        invoice_sara = Invoice.objects.create(
            Transaction_ID=txn_sara,
            Name="Equity Participation Invoice",
            Invoice_Status="Paid",
            Policy_Description="Payment settled upon contract execution.",
            CounterParty_ID=cp_sara,
            Invoice_Type="INDIVIDUAL"
        )
        invoice_business = Invoice.objects.create(
            Transaction_ID=txn_business,
            Name="Escrow Settlement Invoice",
            Invoice_Status="Overdue",
            Policy_Description="Overdue balance must be settled immediately.",
            CounterParty_ID=cp_atlas,
            Invoice_Type="BUSINESS"
        )

        InvoiceLineItem.objects.create(
            Invoice_ID=invoice_john,
            Line_Number=1,
            Header="Advisory Fee",
            Description="Monthly portfolio advisory session",
            Quantity=1,
            Cost=5000.00
        )
        InvoiceLineItem.objects.create(
            Invoice_ID=invoice_john,
            Line_Number=2,
            Header="Reporting Fee",
            Description="Quarterly financial report preparation",
            Quantity=1,
            Cost=1200.00
        )
        InvoiceLineItem.objects.create(
            Invoice_ID=invoice_sara,
            Line_Number=1,
            Header="Equity Participation Fee",
            Description="Initial equity participation charge",
            Quantity=1,
            Cost=250000.00
        )
        InvoiceLineItem.objects.create(
            Invoice_ID=invoice_business,
            Line_Number=1,
            Header="Escrow Holding Fee",
            Description="Fee for holding escrow funds",
            Quantity=1,
            Cost=2500.00
        )
        InvoiceLineItem.objects.create(
            Invoice_ID=invoice_business,
            Line_Number=2,
            Header="Processing Fee",
            Description="Transaction processing charge",
            Quantity=2,
            Cost=1000.00
        )