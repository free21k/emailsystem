from django.db import models

class EmailAddress(models.Model):
    email_address = models.CharField(max_length=256)
    is_deny = models.BooleanField(default=False)
    def __str__(self) :
        return self.email_address;


class Email(models.Model):
    subject = models.TextField()
    contents = models.TextField()
    total = models.IntegerField(default=0)
    complete = models.IntegerField(default=0)
    write_date = models.DateTimeField(auto_now=True)
    complete_date = models.DateTimeField(null=True)
    class State(models.IntegerChoices):
        NOT_START = 1
        PROCESSING = 2
        COMPLETE = 3

    state = models.IntegerField(choices=State.choices, default=State.NOT_START)
    def __str__(self) :
        return self.subject;


class MailTask(models.Model):
    address = models.ForeignKey(EmailAddress, related_name='to_send_address', on_delete=models.DO_NOTHING )
    mail = models.ForeignKey(Email, related_name='to_send_mail', on_delete=models.DO_NOTHING )
    is_complete = models.BooleanField(default=False)
    sent_datetime = models.DateTimeField(null=True)
    def __str__(self) :
        return str(self.mail.subject + " : " + self.address.email_address);
