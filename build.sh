#!/usr/bin/env bash
# exit on error
set -o errexit
/opt/render/project/src/.venv/bin/python -m pip install --upgrade pip

pip install -r requirements.txt
python manage.py migrate --fake notes zero

if [[ $CREATE_SUPERUSER ]];
then
  python manage.py createsuperuser --no-input
fi

python manage.py collectstatic --no-input
python manage.py makemigrations quizzes
python manage.py makemigrations results
python manage.py makemigrations

python manage.py migrate
