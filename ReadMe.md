Installation:

1. Install required packages

    ````
    pip install -r requirements.txt
    ````
    
2. Create database
    ```` 
    python manage.py makemigrations
    python manage.py migrate
    ````

3. Create superuser to have database filled with some data
    ```` 
    ./manage.py createsuperuser
    ````

4. Run
    ````
    ./manage.py runserver
    ````

5. Test
http://localhost:8000/login

6. Add user
To add user to database go to: http://localhost:8000/admin/ and add new users.


