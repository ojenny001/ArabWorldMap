from django.shortcuts import render, redirect
from .models import Phase1Quiz, Phase1Question, Phase2Quiz, Phase2Question, Phase3Quiz, Phase3Question, Country
from django.views.generic import ListView
from django.http import JsonResponse
from results.models import Result
from django.core import serializers
import json

from django.contrib import messages
from django.contrib.auth.models import User, auth

# Create your views here.

def home(request):

    countries = Country.objects.all()
    context = {'countries': countries}
    return render(request, 'quizzes/home.html', context)


def register(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if password == confirm_password:
            if User.objects.filter(username=username).exists():
                messages.info(request, 'Username is already taken')
                return redirect(register)
            elif User.objects.filter(email=email).exists():
                messages.info(request, 'Email is already taken')
                return redirect(register)
            else:
                user = User.objects.create_user(username=username, password=password,
                                                email=email, first_name=first_name, last_name=last_name)
                user.save()

                return redirect('quizzes/login_user')


        else:
            messages.info(request, 'Both passwords are not matching')
            return redirect(register)


    else:
        return render(request, 'quizzes/registration.html')



def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'Invalid Username or Password')
            return redirect('quizzes/login_user')

    else:
        return render(request, 'quizzes/login.html')


def logout_user(request):
    auth.logout(request)
    return redirect('/')

# class Country(ListView):
#     model = Country
#     template_name = 'quizzes/main.html'

# class Progress(ListView):
#     model = Quiz
#     template_name = 'quizzes/main.html'
#
#     def get_results(self, request):
#         result = Result.objects.get(quiz=Quiz.name)
#
#         print('result in get_results: ', result)
#         context = {'result': result}
#         return render(request, self.template_name, context)

def progress_view(request, countryName):
    # Filter through country list to get the country name and then
    # country = Country.objects.get(name=countryName)

    country = Country.objects.get(name=countryName)
    countryName = country.name
    prequiz = Phase1Quiz.objects.filter(name__contains='Pre-Quiz')
    phase1 = Phase1Quiz.objects.filter(name__contains='Phase 1')
    phase2 = Phase2Quiz.objects.filter(name__contains='Phase 2')
    phase3 = Phase3Quiz.objects.filter(name__contains='Phase 3')
    print('Quizzes: ', prequiz, phase1, phase2, phase3)
    results = serializers.serialize("json", Result.objects.filter(country=country))
    results = json.loads(results)
    print('Results: ', results)

    context = {'prequiz': prequiz,
               'phase1': phase1,
               'phase2': phase2,
               'phase3': phase3,
               'results': results,
               'countryName': countryName}
    # prequiz = Quiz.objects.get(country=country, pk=1)
    # prequiz_result = Result.objects.filter(quiz=prequiz).order_by('-score').first()
    #
    # loc_quiz_1 = Quiz.objects.get(pk=2)
    # loc_quiz_result_1 = Result.objects.filter(quiz=loc_quiz_1).order_by('-score').first()
    #
    # cult_quiz_1 = Quiz.objects.get(pk=3)
    # cult_quiz_result_1 = Result.objects.filter(quiz=cult_quiz_1).order_by('-score').first()
    #
    # lang_quiz_1 = Quiz.objects.get(pk=4)
    # lang_quiz_result_1 = Result.objects.filter(quiz=lang_quiz_1).order_by('-score').first()
    #
    # pop_quiz_1 = Quiz.objects.get(pk=5)
    # pop_quiz_result_1 = Result.objects.filter(quiz=pop_quiz_1).order_by('-score').first()
    #
    # hist_quiz_1 = Quiz.objects.get(pk=6)
    # hist_quiz_result_1 = Result.objects.filter(quiz=hist_quiz_1).order_by('-score').first()
    #
    # context = {'prequiz': prequiz,
    #            'prequiz_result': prequiz_result,
    #
    #            'loc_quiz_1': loc_quiz_1,
    #            'loc_quiz_result_1': loc_quiz_result_1,
    #
    #            'cult_quiz_1': cult_quiz_1,
    #            'cult_quiz_result_1': cult_quiz_result_1,
    #
    #            'lang_quiz_1': lang_quiz_1,
    #            'lang_quiz_result_1': lang_quiz_result_1,
    #
    #            'pop_quiz_1': pop_quiz_1,
    #            'pop_quiz_result_1': pop_quiz_result_1,
    #
    #            'hist_quiz_1': hist_quiz_1,
    #            'hist_quiz_result_1': hist_quiz_result_1
    #            }

    return render(request, 'quizzes/main.html', context)

def quiz_view(request, countryName, pk):
    country = Country.objects.get(name=countryName)

    phase1quizzes = Phase1Quiz.objects.get(country=country, pk=pk)
    # phase2quizzes = Phase2Quiz.objects.get(country=country, pk=pk)
    # phase3quizzes = Phase3Quiz.objects.get(country=country, pk=pk)

    print('Country: ', country)
    context = {'phase1': phase1quizzes,
               # 'phase2': phase2quizzes,
               # 'phase3': phase3quizzes,
               'historical_image1': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Cirene_-_il_teatro_-_panoramio.jpg',
               'historical_image2': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Cirene_-_il_teatro_-_panoramio.jpg',
               'historical_image3': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Cirene_-_il_teatro_-_panoramio.jpg',
               'image1_desc': 'Leptis Magna Theatre',
               'image2_desc': 'Ruins of Cyrene',
               'image3_desc': 'Arc of Marcus Aurelius',
               'video': 'https://www.youtube.com/embed/SNTtyIEDrfk'
               }
    # {'country': country,

    return render(request, 'quizzes/quiz.html', context)

def quiz_data_view(request, countryName, pk):
    country = Country.objects.get(name=countryName)
    quiz = Phase1Quiz.objects.get(country=country, pk=pk)

    questions = []
    for q in quiz.get_questions():
        answers = []
        answers.append(q.op1)
        answers.append(q.op2)
        answers.append(q.op3)
        answers.append(q.op4)
        questions.append({str(q): answers})

    return JsonResponse({
        'data': questions,
        'answer': q.answer
    })

def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

def submit_quiz_view(request, countryName, pk):
    # print(request.POST)
    if is_ajax(request):
        questions = []
        data = request.POST
        data_ = dict(data.lists())

        data_.pop('csrfmiddlewaretoken')

        for k in data_.keys():
            print('key: ', k)
            question = Phase1Question.objects.get(text=k, quiz=pk)
            questions.append(question)

        print(questions)

        country = Country.objects.get(name=countryName)
        user = request.user
        quiz = Phase1Quiz.objects.get(country=country, pk=pk)

        score = 0
        numQuestions = 0
        results = []
        correct_answer = None

        for q in questions:
            numQuestions += 1
            a_selected = request.POST.get(q.text)

            if a_selected != "":
                if a_selected == q.answer:
                    score += 1
                    correct_answer = q.answer
                else:
                    correct_answer = q.answer

                results.append({str(q): {'correct_answer': correct_answer, 'answered': a_selected}})

            else:
                results.append({str(q): 'not answered'})

        multiplier = 100 / numQuestions
        score_ = score * multiplier
        Result.objects.create(quiz=quiz, user=user, country=country, score=score_)

        if score_ >= quiz.required_score_to_pass:
            return JsonResponse({'passed': True, 'score': score_, 'results': results})
        else:
            return JsonResponse({'passed': False, 'score': score_, 'results': results})



def phase2_view(request, countryName, pk):
    country = Country.objects.get(name=countryName)

    quiz = Phase2Quiz.objects.get(country=country, pk=pk)

    context = {'obj': quiz}

    return render(request, 'quizzes/phase2.html', context)


def phase2_data_view(request, countryName, pk):
    country = Country.objects.get(name=countryName)
    quiz = Phase2Quiz.objects.get(country=country, pk=pk)

    questions = []
    for q in quiz.get_questions():
        questions.append({str(q): q.answer})

    return JsonResponse({
        'data': questions,
    })


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

def submit_phase2_view(request, countryName, pk):
    # print(request.POST)
    if is_ajax(request):
        questions = []
        data = request.POST
        data_ = dict(data.lists())

        data_.pop('csrfmiddlewaretoken')
        print('Data: ', data_)


        for k in data_.keys():
            print('key: ', k)
            question = Phase2Question.objects.get(text=k)
            questions.append(question)

        print(questions)

        country = Country.objects.get(name=countryName)
        user = request.user
        quiz = Phase2Quiz.objects.get(country=country, pk=pk)

        score = 0
        numQuestions = 0
        results = []
        correct_answer = None

        for q in questions:
            numQuestions += 1
            a_selected = request.POST.get(q.text)

            if a_selected != "":
                if a_selected == q.answer:
                    score += 1
                    correct_answer = q.answer
                else:
                    correct_answer = q.answer

                results.append({str(q): {'correct_answer': correct_answer, 'answered': a_selected}})

            else:
                results.append({str(q): 'not answered'})

        multiplier = 100 / numQuestions
        score_ = score * multiplier
        Result.objects.create(quiz=quiz, user=user, country=country, score=score_)

        if score_ >= quiz.required_score_to_pass:
            return JsonResponse({'passed': True, 'score': score_, 'results': results})
        else:
            return JsonResponse({'passed': False, 'score': score_, 'results': results})