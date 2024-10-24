# To implement a user authentication system in Django using MySQL as the database, we will build a system where users can register, log in, and access protected pages based on their credentials. Below is the full code, file structure, and steps to set up the database.

# Project Overview
# We will:

# Set up a Django project.
# Configure MySQL as the database.
# Create views and forms for user registration and authentication.
# Set up protected pages that require login.
# Use Django’s built-in authentication system for handling user login and registration.
# Step-by-Step Instructions
# 1. Set Up the Django Project
# Install Django and MySQL client:

# bash
# Copy code
# pip install django
# pip install mysqlclient
# Start a New Django Project:

# bash
# Copy code
# django-admin startproject authsystem
# cd authsystem
# Create a New App for user management:

# bash
# Copy code
# python manage.py startapp accounts
# File Structure:

# bash
# Copy code
# authsystem/
# ├── authsystem/           # Project-level folder
# │   ├── __init__.py
# │   ├── asgi.py
# │   ├── settings.py
# │   ├── urls.py
# │   ├── wsgi.py
# ├── accounts/             # App folder for user management
# │   ├── migrations/
# │   ├── __init__.py
# │   ├── admin.py
# │   ├── apps.py
# │   ├── forms.py
# │   ├── models.py
# │   ├── urls.py
# │   ├── views.py
# ├── manage.py
# 2. Configure MySQL in settings.py
# Install MySQL (Skip if already installed) and create a new MySQL database:

# Database name: auth_db
# bash
# Copy code
# CREATE DATABASE auth_db;
# Configure Database Settings in Django in the settings.py file:

# python
# Copy code
# # settings.py
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'auth_db',  # Name of your MySQL database
#         'USER': 'your_mysql_user',  # MySQL username
#         'PASSWORD': 'your_mysql_password',  # MySQL password
#         'HOST': 'localhost',  # Database host
#         'PORT': '3306',  # MySQL port (default: 3306)
#     }
# }
# Add the accounts app to the INSTALLED_APPS in settings.py:
# python
# Copy code
# INSTALLED_APPS = [
#     ...
#     'accounts',
#     'django.contrib.auth',  # For user authentication
#     'django.contrib.sessions',  # For managing user sessions
#     'django.contrib.messages',  # For flash messages
# ]
# Configure the authentication URL redirect in settings.py:
# python
# Copy code
# LOGIN_URL = 'login'
# LOGIN_REDIRECT_URL = 'dashboard'  # Redirect to after login
# LOGOUT_REDIRECT_URL = 'login'  # Redirect after logout
# 3. Set Up URLs
# Project-level URLs (authsystem/urls.py):
# python
# Copy code
# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('accounts/', include('accounts.urls')),  # Include URLs from the accounts app
# ]
# App-level URLs (accounts/urls.py):
# python
# Copy code
# from django.urls import path
# from . import views

# urlpatterns = [
#     path('register/', views.register, name='register'),
#     path('login/', views.login_view, name='login'),
#     path('logout/', views.logout_view, name='logout'),
#     path('dashboard/', views.dashboard, name='dashboard'),
# ]
# 4. Create Views (accounts/views.py)
# We will implement views for registration, login, logout, and the dashboard.

# python
# Copy code
# from django.shortcuts import render, redirect
# from django.contrib.auth import login, authenticate, logout
# from django.contrib.auth.forms import AuthenticationForm
# from django.contrib.auth.decorators import login_required
# from .forms import RegisterForm

# # User registration view
# def register(request):
#     if request.method == 'POST':
#         form = RegisterForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('login')
#     else:
#         form = RegisterForm()
#     return render(request, 'accounts/register.html', {'form': form})

# # User login view
# def login_view(request):
#     if request.method == 'POST':
#         form = AuthenticationForm(request, data=request.POST)
#         if form.is_valid():
#             username = form.cleaned_data.get('username')
#             password = form.cleaned_data.get('password')
#             user = authenticate(username=username, password=password)
#             if user is not None:
#                 login(request, user)
#                 return redirect('dashboard')
#     else:
#         form = AuthenticationForm()
#     return render(request, 'accounts/login.html', {'form': form})

# # User logout view
# def logout_view(request):
#     logout(request)
#     return redirect('login')

# # Dashboard (protected page)
# @login_required
# def dashboard(request):
#     return render(request, 'accounts/dashboard.html')
# 5. Create Forms (accounts/forms.py)
# We’ll use Django’s built-in UserCreationForm for the user registration form.

# python
# Copy code
# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User

# # Registration form
# class RegisterForm(UserCreationForm):
#     email = forms.EmailField(required=True)

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password1', 'password2']
# 6. Create Templates (accounts/templates/accounts/)
# register.html: User registration form.
# html
# Copy code
# <h2>Register</h2>
# <form method="post">
#     {% csrf_token %}
#     {{ form.as_p }}
#     <button type="submit">Register</button>
# </form>
# login.html: User login form.
# html
# Copy code
# <h2>Login</h2>
# <form method="post">
#     {% csrf_token %}
#     {{ form.as_p }}
#     <button type="submit">Login</button>
# </form>
# dashboard.html: Protected page only accessible by logged-in users.
# html
# Copy code
# <h2>Welcome to the Dashboard!</h2>
# <p>You are logged in as {{ user.username }}.</p>
# <a href="{% url 'logout' %}">Logout</a>
# 7. Apply Migrations and Create Superuser
# Apply the Migrations:

# bash
# Copy code
# python manage.py makemigrations
# python manage.py migrate
# Create a Superuser to access the admin panel:

# bash
# Copy code
# python manage.py createsuperuser
# 8. Run the Development Server
# Start the Django development server to test the authentication system:

# bash
# Copy code
# python manage.py runserver
# You can now access the application at http://127.0.0.1:8000/accounts/login/.

# Full Directory Structure
# markdown
# Copy code
# authsystem/
# ├── authsystem/
# │   ├── __init__.py
# │   ├── asgi.py
# │   ├── settings.py
# │   ├── urls.py
# │   ├── wsgi.py
# ├── accounts/
# │   ├── migrations/
# │   ├── __init__.py
# │   ├── admin.py
# │   ├── apps.py
# │   ├── forms.py
# │   ├── models.py
# │   ├── urls.py
# │   ├── views.py
# │   └── templates/
# │       └── accounts/
# │           ├── register.html
# │           ├── login.html
# │           └── dashboard.html
# ├── manage.py