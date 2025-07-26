# healthy4u
Healthy4U Prototype website for Scholar's Technopreneurship Training Program DOST

## First time setup

#### Backend
1. from root project folder, do 'cd backend'
2. create environment, 'python -m venv venv'
3. activate environment, 'venv\scripts\activate'
4. install dependencies 'pip install -r requirements.txt'
5. initialize database 'python manage.py makemigrations' and 'python manage.py migrate'
6. create a user 'python manage.py createsuperuser'
7. start the server 'python manage.py runserver'

#### Frontend
1. from root project folder, do 'cd frontend'
2. 'npm install' to install dependencies
3. 'npx quasar dev' to run quasar SPA
