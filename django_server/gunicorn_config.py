import os
from dotenv import load_dotenv

# set env file for wsgi 
load_dotenv(dotenv_path=".env.prod")
os.environ.setdefault('DJANGO_ENV', "production")


wsgi_app = "backend.wsgi:application"
bind = "0.0.0.0:8000" 
workers = 4 
timeout = 120
daemon = True
