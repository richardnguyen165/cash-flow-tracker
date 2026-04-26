from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# https://www.freecodecamp.org/news/how-to-create-a-json-web-token-in-the-django-rest-framework/

# https://www.django-rest-framework.org/api-guide/serializers/#writable-nested-representations (for nested serializer such as contract)

class TokenSerializer(TokenObtainPairSerializer):
    User_Role = serializers.CharField(write_only=True)
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['User_Role'] = user.User_Role
        token['User_ID'] = user.id
        
        if user.User_Role == "INDIVIDUAL":
            token['id'] = user.individual.id
        elif user.User_Role == "BUSINESS":
            token['id'] = user.business.id
        elif user.User_Role == "BUSINESS_ADMIN":
            token['id'] = user.business_admin.id
            token['business_id'] = user.business_admin.business_id.id
        elif user.User_Role == "SITE_ADMIN":
            token['id'] = user.site_admin.id
        else:
            token['id'] = user.employee.id
            
        return token

    # For logging in (https://dev.to/koladev/django-rest-authentication-cmh)
    def validate(self, attrs):
        
        sign_in_mapping = {
            "individual-client": "INDIVIDUAL",
            "business-admin":    "BUSINESS_ADMIN",
            "employee":          "EMPLOYEE",
            "site-admin":        "SITE_ADMIN",
        }
        
        data = super().validate(attrs)
        
        if self.user.User_Role != sign_in_mapping.get(attrs["User_Role"]):
            raise serializers.ValidationError("Wrong password / account")

        return data
    
class UserSerializer(serializers.ModelSerializer):
    # Cannot read password
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "User_Role"
        ]
    
    # https://www.django-rest-framework.org/api-guide/serializers/#field-level-validation
    
    def validate(self, data):
        # Each username can be reused across roles, but not twice for the same role.
        if User.objects.filter(username=data["username"], User_Role=data["User_Role"]).exists():
            raise serializers.ValidationError(
                f"Account already registered under {data['User_Role']}"
            )
        return data
        
    
    def create(self, data):
        return User.objects.create_user(
            username = data["username"],
            password = data["password"],
            User_Role= data["User_Role"]
        )
            
class IndividualSerializer(serializers.ModelSerializer):
    User_ID = UserSerializer()
    
    class Meta:
        model = Individual
        fields = [
            "User_ID",
            "Individual_Balance",
            "Individual_BirthDate",
            # "Individual_Profile",
            "Individual_PhoneNumber",
            "Individual_Name"
        ]
    
    def validate(self, data):
        # There is an account registered under the same phone number
        if Individual.objects.filter(Individual_PhoneNumber=data["Individual_PhoneNumber"]).exists():
            raise serializers.ValidationError(f"Individual already registered under the same phone number.")            
        return data

    def create(self, data):
        # Extracts user data from consideration
        indiv_data = data.pop("User_ID")
        # Sets it to individual client
        indiv_data["User_Role"] = User.Role.INDIVIDUAL_CLIENT
        
        # Check if user data is valid
        verify_user = UserSerializer(data=indiv_data)
        verify_user.is_valid(raise_exception=True)
        user_indiv = verify_user.save()
        
        # Create individual object, with reference to user object, and return the individual object
        finalized_individual = Individual.objects.create(
            User_ID = user_indiv,
            **data
        )
        
        return finalized_individual
    
class BusinessSerializer(serializers.ModelSerializer):
    User_ID = UserSerializer()
    
    class Meta:
        model = Business
        fields = [
            "User_ID",
            # "Business_ID",
            "Business_Name",
            "Business_Balance",
            # "Business_Profile",
            "Business_PhoneNumber",
            "Business_AccessCode"
        ]
    
    def validate(self, data):
        # There is an account registered under the same phone number
        if Business.objects.filter(Business_PhoneNumber=data["Business_PhoneNumber"]).exists():
            raise serializers.ValidationError(f"Business already registered under the same phone number.")            
        return data

    def create(self, data):
        print(data)
        # Extracts user data from consideration
        business_data = data.pop("User_ID")
        # Sets it to business client
        business_data["User_Role"] = User.Role.BUSINESS_CLIENT
        
        # Check if user data is valid
        verify_user = UserSerializer(data=business_data)
        verify_user.is_valid(raise_exception=True)
        user_indiv = verify_user.save()
        
        # Create business object, with reference to user object, and return the business object
        finalized_business = Business.objects.create(
            User_ID = user_indiv,
            **data
        )
        
        return finalized_business
        
class SiteAdminSerializer(serializers.ModelSerializer):
    User_ID = UserSerializer()
    
    class Meta:
        model = Site_Admin
        fields = [
            "User_ID",
            "SiteAdmin_Name",
            "SiteAdmin_BirthDate",
            # "SiteAdmin_Profile",
            "SiteAdmin_PhoneNumber",
            # this is serializer only
            "authorizationCode"
        ]
        
    def validate(self, data):
        # There is an account registered under the same phone number
        if Site_Admin.objects.filter(SiteAdmin_PhoneNumber=data["SiteAdmin_PhoneNumber"]).exists():
            raise serializers.ValidationError(f"Site Admin already registered under the same phone number.")            
        elif data["authorizationCode"] != "123456":
            raise serializers.ValidationError(f"Unauthroized to become site admin.")     
        return data

    def create(self, data):
        # discards authroization code
        data.pop("authorizationCode", None)
        # Extracts user data from consideration
        user_data = data.pop("User_ID")
        # Sets it to business client
        user_data["User_Role"] = User.Role.SITE_ADMIN
        
        # Check if user data is valid
        verify_user = UserSerializer(data=user_data)
        verify_user.is_valid(raise_exception=True)
        user_indiv = verify_user.save()
        
        # Create business object, with reference to user object, and return the business object
        finalized_site_admin = Site_Admin.objects.create(
            User_ID = user_indiv,
            **data
        )
        
        return finalized_site_admin
        
class BusinessAdminSerializer(serializers.ModelSerializer):
    userReference = UserSerializer()
    businessAccessCode = serializers.CharField(write_only=True)
    
    class Meta:
        model = Business_Admin
        fields = [
          "userReference", 
          "BusinessAdmin_Name",
          "BusinessAdmin_BirthDate",
        #   "BusinessAdmin_Profile",
          "BusinessAdmin_PhoneNumber",
          "businessAccessCode"
        ]
    
    def validate(self, data):
        # There is an account registered under the same phone number
        if Business_Admin.objects.filter(BusinessAdmin_PhoneNumber=data["BusinessAdmin_PhoneNumber"]).exists():
            raise serializers.ValidationError("Business Admin already registered under the same phone number.")
        return data
    
    def create(self, data):
        access_code = data.pop("businessAccessCode")
        try:
            # Connect it to an existing business
            business = Business.objects.get(Business_AccessCode=access_code)
        except Business.DoesNotExist:
            raise serializers.ValidationError({"businessAccessCode": "Invalid business access code."})

        # Extract user data
        business_user_data = data.pop("userReference")
        business_user_data["User_Role"] = User.Role.BUSINESS_ADMIN
        
        # Check if user data is valid
        verify_user = UserSerializer(data=business_user_data)
        verify_user.is_valid(raise_exception=True)
        user_indiv = verify_user.save()
        
        # Create business admin
        finalized_business_admin = Business_Admin.objects.create(
            User_ID=user_indiv,
            Business_ID=business,
            **data
        )
        
        return finalized_business_admin
        
class CounterPartySerializer(serializers.ModelSerializer):
    class Meta:
        model = CounterParty
        fields = [
            "CounterParty_ID",
            "CounterParty_Type",
            "CounterParty_Email"
            ]
    
    def validate(self, data):
        email = data.get('CounterParty_Email')
        counterparty_type = data.get('CounterParty_Type')
        if counterparty_type == 'INDIVIDUAL':
            if not User.objects.filter(email=email, User_Role=User.Role.INDIVIDUAL_CLIENT).exists():
                raise serializers.ValidationError("Individual with this email does not exist.")
        elif counterparty_type == 'BUSINESS':
            if not User.objects.filter(email=email, User_Role=User.Role.BUSINESS_CLIENT).exists():
                raise serializers.ValidationError("Business with this email does not exist.")
        else:
            raise serializers.ValidationError("Invalid CounterParty_Type.")
        return data
    
    def create(self, validated_data):
        return CounterParty.objects.create(**validated_data)

class ExpensePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense_Plan
        fields = [
          "id", 
          "Business_ID", 
          "Plan_Title", 
          "Expense_Plan_Due"
        ]
    
    def create(self, data):
        return Expense_Plan.objects.create(**data)

class ExpenseSerializer(serializers.ModelSerializer):
    Expense_Plan_ID = ExpensePlanSerializer()
    
    class Meta:
        model = Expense
        fields = [
            "id",
            "Expense_Plan_ID",
            "Cost",
            "Expense_Title",
            "Expense_Type",
            "Description",
            "Expense_Date_Issued",
            "Expense_Due_By",
        ]
    
    def create(self, data):
        expense_plan_data = data.pop('Expense_Plan_ID')
        expense_plan = ExpensePlanSerializer().create(expense_plan_data)
        expense = Expense.objects.create(Expense_Plan_ID=expense_plan, **data)
        return expense

class ContractSerializer(serializers.ModelSerializer):
    Contract_CounterParty_ID = CounterPartySerializer()
    Contract_Expense_ID = ExpenseSerializer()
    
    class Meta:
        model = Contract
        fields = [
            "id",
            "Business_ID",
            "Contract_CounterParty_ID",
            "Contract_Expense_ID",
            "Contract_Completion_Date",
            "Contract_Name",
            "Contract_Terms",
            "Contract_Status",
            "Contract_Type",
            "Contract_Cost"
        ]

    def create(self, data):
        counter_party_data = data.pop('Contract_CounterParty_ID')
        counter_party = CounterPartySerializer().create(counter_party_data)
        
        expense_data = data.pop('Contract_Expense_ID')
        expense_data['Expense_Plan_ID']['Business_ID'] = data['Business_ID']
        expense = ExpenseSerializer().create(expense_data)
        
        contract = Contract.objects.create(
            Contract_CounterParty_ID=counter_party,
            Contract_Expense_ID=expense,
            **data
        )
        
        return contract

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

class ExpensePayOffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense_Pay_Off
        fields = [
          "Transaction_ID",
          "Expense_ID", 
          "Total_Pay"]

class EmployeeSerializer(serializers.ModelSerializer):
    def validate(self, data):
        user = data.get("User_ID")

        if user is None:
            raise serializers.ValidationError({"User_ID": "Employee must be linked to a user account."})

        # Staff records should only point to login accounts created for employee access.
        if user.User_Role != User.Role.EMPLOYEE:
            raise serializers.ValidationError({"User_ID": "Selected user is not registered as an employee."})

        existing_employee = Employee.objects.filter(User_ID=user)
        if self.instance:
            existing_employee = existing_employee.exclude(pk=self.instance.pk)

        if existing_employee.exists():
            raise serializers.ValidationError({"User_ID": "This user is already assigned as an employee."})

        return data

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
