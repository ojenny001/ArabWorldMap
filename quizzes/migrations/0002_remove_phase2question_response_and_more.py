# Generated by Django 4.2.4 on 2024-01-02 18:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quizzes', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='phase2question',
            name='response',
        ),
        migrations.RemoveField(
            model_name='phase3question',
            name='response',
        ),
    ]