from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

""" emailsystem.settings 파일을 사용하도록 설정 """
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'emailsystem.settings')

""" emailsystem를 사용하도록 설정 """
app = Celery('emailsystem')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))