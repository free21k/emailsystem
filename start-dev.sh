#!/bin/bash
python3 manage.py process_tasks &
python3 manage.py runserver 0.0.0.0:8000
