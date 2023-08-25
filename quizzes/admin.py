from django.contrib import admin
from .models import Question, Quiz , Country

# Register your models here.

# class QuizInline(admin.TabularInline):
#     model = Quiz
#
# class CountryAdmin(admin.ModelAdmin):
#     inlines = [QuizInline]

class QuestionInline(admin.TabularInline):
    model = Question

class QuizAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]

admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question)
admin.site.register(Country)
# admin.site.register(Country, CountryAdmin)

