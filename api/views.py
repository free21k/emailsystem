from time import sleep

from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import EmailMessage
from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework import generics
from django.db.models import Max, Min
from django.template import loader
from django.shortcuts import redirect, render
from django.http import HttpResponse, JsonResponse
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication
from rest_framework import viewsets, permissions

from background_task import background

from .models import EmailAddress, Email
from .serializers import LoginUserSerializer, UserSerializer, EmailSerializer
from api.models import MailTask
from api.serializers import EmailAddressSerializer
import datetime


class LoginView(TemplateView):
    template_name = 'api/login.html'


class LoginAPI(generics.GenericAPIView):
    permission_classes = []
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        response = Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": token.key,
            }
        )
        response.delete_cookie("token")
        return response


class LogoutnAPI(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        token_str = request.COOKIES.get('token')
        if not token_str: 
            body = {"message": "wrong token"}
            return Response(body, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = Token.objects.get(key=token_str)
            user = token.user # get the user
        except User.DoesNotExist:
            body = {"message": "wrong token"}
            return Response(body, status=status.HTTP_400_BAD_REQUEST)
        token.delete()
        response = Response({})
        response.delete_cookie('token')
        return response


class GenericDataTableAPIView(generics.GenericAPIView):
    page_count = 30
    def get_start_end(self, request):
        start = 0
        end = start + self.page_count
        try:
            start = int(request.GET['start'])
            end = int(request.GET['length']) + start
        except:
            pass
        return start, end
    def make_response(self, data, total_size):
        response = {
            'iTotalRecords': total_size, 
            'iTotalDisplayRecords': total_size, 
            'data': data,
        }
        return Response(response)


class EmailAddressAPI(GenericDataTableAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        address = EmailAddress(email_address=request.POST['email_address'])
        address.save()
        return Response({})

    def get(self, request):
        start, end = self.get_start_end(request)
        addresses = EmailAddress.objects.all()[start:end]
        total_size = EmailAddress.objects.count()

        data = []
        
        for address in addresses:
            data.append(EmailAddressSerializer(address).data)
        return self.make_response(data, total_size)


class EmailAPI(GenericDataTableAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        email = Email(subject=request.POST['subject'], contents=request.POST['contents'])
        addresses = EmailAddress.objects.filter(is_deny=False)
        email.total = addresses.count()
        email.save()
        for address in addresses:
            task_param = {'address_id':address.id, 'email_id':email.id}
            send_mail_task(task_param)

        return Response({})

    def get(self, request):
        start, end = self.get_start_end(request)
        
        emails = Email.objects.all()[start:end]
        total_size = Email.objects.count()

        data = []
        
        for email in emails:
            data.append(EmailSerializer(email).data)
        
        return self.make_response(data, total_size)


class DenyEmailAPI(generics.GenericAPIView):
    def put(self, request, *args, **kwargs):
        email = EmailAddress.objects.get(email_address=request.data['email_address'])
        email.is_use = False
        email.save()
        return Response({})


@background(schedule=1)
def send_mail_task(task_param):
    print('start send mail task')
    email = Email.objects.get(pk=task_param['email_id'])
    address = EmailAddress.objects.get(pk=task_param['address_id'])
    mail_task = MailTask(address=address, mail=email)
    mail = mail_task.mail
    
    if mail.complete == 0:
        mail.state = Email.State.PROCESSING
    
    email = EmailMessage(
        mail.subject,
        mail.contents,
        'eclipse@ahope.co.kr',      # from
        to=[mail_task.address],     # to
    )
    
    email.content_subtype = "html"
    email.send()

    mail_task.is_complete = True
    mail.complete += 1
    mail_task.save()

    if mail.total == mail.complete:
        mail.complete_date = datetime.datetime.now()
        mail.state = Email.State.COMPLETE
    
    mail.save()


def get_user_from_cookie(request):
    token_str = request.COOKIES.get('token')
    if not token_str: 
        return None
    try:
        token = Token.objects.get(key=token_str)
        user = token.user # get the user
    except:
        return None
    return user

def emails(request):
    user = get_user_from_cookie(request)
    if user == None:
        return redirect('login')
    
    return render(request, 'api/emails.html', {'user': user,})

def email_addresses(request):
    user = get_user_from_cookie(request)
    if user == None:
        return redirect('login')
    
    return render(request, 'api/email_addresses.html', {'user': user,})
