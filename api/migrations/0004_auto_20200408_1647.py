# Generated by Django 3.0.4 on 2020-04-08 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200405_1751'),
    ]

    operations = [
        migrations.AlterField(
            model_name='email',
            name='write_date',
            field=models.DateTimeField(null=True),
        ),
    ]
