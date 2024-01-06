from django.db import models
from random import random

# Create your models here.
class Country(models.Model):
    name = models.CharField(max_length=50, null=True)

    def __str__(self):
        return f"{self.name}"

    def get_quizzes(self):
        return self.quiz_set.all()

    class Meta:
        verbose_name_plural = 'Countries'


class Phase1Quiz(models.Model):
    name = models.CharField(max_length=120, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)
    # country = models.CharField(max_length=50, null=True)
    required_score_to_pass = models.IntegerField(help_text="required score to pass", null=True)

    def __str__(self):
        return f"{self.name}"

    def get_questions(self):
        return self.phase1question_set.all()

    class Meta:
        verbose_name_plural = 'Phase 1 Quizzes'

class Phase1Question(models.Model):
    text = models.CharField(max_length=200, null=True)
    quiz = models.ForeignKey(Phase1Quiz, on_delete=models.CASCADE, null=True)
    op1 = models.CharField(max_length=200, null=True)
    op2 = models.CharField(max_length=200, null=True)
    op3 = models.CharField(max_length=200, null=True)
    op4 = models.CharField(max_length=200, null=True)
    answer = models.CharField(max_length=200, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.text)

    def get_answer(self):
        return self.answer

    class Meta:
        verbose_name_plural = 'Phase 1 Questions'


class Phase2Quiz(models.Model):
    name = models.CharField(max_length=120, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)
    required_score_to_pass = models.IntegerField(help_text="required score to pass", null=True)

    def __str__(self):
        return f"{self.name}"

    def get_questions(self):
        return self.phase2question_set.all()

    class Meta:
        verbose_name_plural = 'Phase 2 Quizzes'

class Phase2Question(models.Model):
    text = models.CharField(max_length=200, null=True)
    quiz = models.ForeignKey(Phase2Quiz, on_delete=models.CASCADE, null=True)
    answer = models.CharField(max_length=200, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.text)

    def get_answer(self):
        return self.answer

    class Meta:
        verbose_name_plural = 'Phase 2 Questions'


class Phase3Quiz(models.Model):
    name = models.CharField(max_length=120, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)
    required_score_to_pass = models.IntegerField(help_text="required score to pass", null=True)

    def __str__(self):
        return f"{self.name}"

    def get_questions(self):
        return self.phase3question_set.all()

    class Meta:
        verbose_name_plural = 'Phase 3 Quizzes'

class Phase3Question(models.Model):
    text = models.CharField(max_length=200, null=True)
    quiz = models.ForeignKey(Phase3Quiz, on_delete=models.CASCADE, null=True)
    answer = models.CharField(max_length=200, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.text)

    def get_answer(self):
        return self.answer

    class Meta:
        verbose_name_plural = 'Phase 3 Questions'



