from django.contrib import admin
from .models import Phase1Question, Phase1Quiz, Country, Phase2Question, Phase2Quiz, Phase3Question, Phase3Quiz

# Register your models here.

# class QuizInline(admin.TabularInline):
#     model = Quiz
#
# class CountryAdmin(admin.ModelAdmin):
#     inlines = [QuizInline]

class Phase1QuestionInline(admin.TabularInline):
    model = Phase1Question

class Phase1QuizAdmin(admin.ModelAdmin):
    inlines = [Phase1QuestionInline]

class Phase2QuestionInline(admin.StackedInline):
    model = Phase2Question

class Phase2QuizAdmin(admin.ModelAdmin):
    inlines = [Phase2QuestionInline]

class Phase3QuestionInline(admin.StackedInline):
    model = Phase3Question

class Phase3QuizAdmin(admin.ModelAdmin):
    inlines = [Phase3QuestionInline]


admin.site.register(Phase1Quiz, Phase1QuizAdmin)
admin.site.register(Phase1Question)
admin.site.register(Country)
admin.site.register(Phase2Quiz, Phase2QuizAdmin)
admin.site.register(Phase2Question)
admin.site.register(Phase3Quiz, Phase3QuizAdmin)
admin.site.register(Phase3Question)

