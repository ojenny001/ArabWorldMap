from django.db import models
from quizzes.models import Phase1Quiz, Phase2Quiz, Country
from django.contrib.auth.models import User

# Create your models here.

class Result(models.Model):
    quiz = models.ForeignKey(Phase1Quiz, on_delete=models.CASCADE, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    score = models.FloatField()

    def __str__(self):
        return str(self.pk)

