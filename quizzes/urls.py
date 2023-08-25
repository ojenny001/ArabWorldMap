from django.urls import path
from .views import (
    home,
    progress_view,
    quiz_view,
    quiz_data_view,
    submit_quiz_view
    )

app_name = 'quizzes'

urlpatterns = [
    path('', home, name='home'),
    path('<str:countryName>/progress/', progress_view, name='main-view'),
    path('<str:countryName>/progress/<int:pk>/', quiz_view, name='quiz-view'),
    path('<str:countryName>/progress/<int:pk>/submit/', submit_quiz_view, name='submit-view'),
    path('<str:countryName>/progress/<int:pk>/data/', quiz_data_view, name='quiz-data-view'),

]