#!/usr/bin/env bash
# exit on error
set -o errexit
/opt/render/project/src/.venv/bin/python -m pip install --upgrade pip

pip install -r requirements.txt

if [[ $CREATE_SUPERUSER ]];
then
  python manage.py createsuperuser --no-input
fi

python manage.py collectstatic --no-input
python manage.py migrate --fake ArabWorldMap zero


python manage.py migrate quizzes
python manage.py migrate results
python manage.py migrate
