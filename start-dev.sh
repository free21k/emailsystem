#!/bin/bash
python manage.py process_tasks&
python manage.py python manage.py runserver 0.0.0.0:8000
