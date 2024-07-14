# Generated by Django 5.0.7 on 2024-07-13 03:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interests', '0002_alter_interest_receiver_alter_interest_sender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interest',
            name='message',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='interest',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], default='pending', max_length=20),
        ),
    ]
