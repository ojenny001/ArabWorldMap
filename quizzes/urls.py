from django.urls import path
from .views import (
    home,
    register,
    login_user,
    logout_user,
    progress_view,
    quiz_view,
    quiz_data_view,
    submit_quiz_view,
    phase2_view,
    phase2_data_view,
    submit_phase2_view
    )

app_name = 'quizzes_staticfiles'

urlpatterns = [
    path('', home, name='home'),
    path('register', register, name='register'),
    path('login_user', login_user, name='login_user'),
    path('logout_user', logout_user, name='logout_user'),
    path('home', home, name='home'),
    path('<str:countryName>/progress/', progress_view, name='main-view'),
    path('<str:countryName>/progress/<int:pk>/', quiz_view, name='quiz-view'),
    path('<str:countryName>/progress/<int:pk>/submit/', submit_quiz_view, name='submit-view'),
    path('<str:countryName>/progress/<int:pk>/data/', quiz_data_view, name='quiz-data-view'),
    path('<str:countryName>/progress/<int:pk>/phase2/', phase2_view, name='phase2-view'),
    path('<str:countryName>/progress/<int:pk>/phase2/submit/', submit_phase2_view, name='submit-phase2-view'),
    path('<str:countryName>/progress/<int:pk>/phase2/data/', phase2_data_view, name='phase2-data-view'),

]