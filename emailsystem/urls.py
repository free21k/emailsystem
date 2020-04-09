"""emailsystem URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from api.views import DenyEmailAPI, LoginView, LoginAPI, LogoutnAPI
from api.views import emails, email_addresses
from api.views import EmailAddressAPI, EmailAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    url("^api/denyemail/$", DenyEmailAPI.as_view()),
    url("^api/emails$", EmailAPI.as_view()),
    url("^api/email_addresses$", EmailAddressAPI.as_view()),
    url("^api/auth/login/$", LoginAPI.as_view()),
    url("^api/auth/logout/$", LogoutnAPI.as_view()),
    url("^login$", LoginView.as_view(), name="login"),
    url("^emails$", emails),
    url("^email_addresses$", email_addresses),
]

