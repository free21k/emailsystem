# myapp/management/commands/mycommand.py 
from django.conf import settings

from django.core.management.base import BaseCommand 
from django.core.mail import EmailMessage

from api.models import EmailAddress

class Command(BaseCommand):
    help = 'check the latest instance of MyModel'
    def handle(self, *args, **kwargs):
        email_body = '<H1>TEST</H1>'
        
        email = EmailMessage(
            'Hello',                # 제목
            email_body,       # 내용
            'eclipse@ahope.co.kr',     # 보내는 이메일 (settings에 설정해서 작성안해도 됨)
            to=['eclipse@ahope.co.kr'],  # 받는 이메일 리스트
        )
        email.content_subtype = "html"
        email.send()
