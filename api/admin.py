from django.contrib import admin
from .models import EmailAddress, Email, MailTask
# Register your models here.

admin.site.register(EmailAddress)
admin.site.register(Email)
admin.site.register(MailTask)