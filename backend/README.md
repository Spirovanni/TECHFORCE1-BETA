### Django

1. Generate virtualenv

    `python3 -m venv env`

2. Activate venv

    `source env/bin/activate`

3. Install required Python packages using pip and requirements.txt  

    `pip3 install -r requirements.txt`

4. Create database

    `python3 manage.py makemigrations`
    `python3 manage.py migrate`

5. Load initial data to database using Django fixtures

    `python3 manage.py loaddata fixtures/initial_data.json`

6. Run App

      `python3 manage.py runserver`
      
7. Creating an admin user
First we’ll need to create a user who can login to the admin site. Run the following command:

    `$ python3 manage.py createsuperuser`

    Enter your desired username and press enter.

    Username: admin
    You will then be prompted for your desired email address:

    Email address: admin@example.com
    The final step is to enter your password. You will be asked to enter your password twice, the second time as a confirmation of the first.

    Password: **********
    Password (again): *********
    Superuser created successfully.