# Generated by Django 3.0.4 on 2020-04-09 01:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20200409_1044'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='complete',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='mailtask',
            name='mail',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='to_send_mail', to='api.Email'),
        ),
    ]
