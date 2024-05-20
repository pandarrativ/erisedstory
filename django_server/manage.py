#!/usr/bin/env python
import os
import sys
from dotenv import load_dotenv


def main():
    # $python manage.py runserver PROD
    # $python manage.py runserver DEV/$python manage.py runserver

    environment = 'development'  
    if len(sys.argv) > 1:
        command = sys.argv[1]
        if command == 'runserver':
            if len(sys.argv) > 2:
                if sys.argv[2].upper() == 'PROD':
                    environment = 'production'
                    sys.argv.pop(2)  # Remove the environment argument
                elif sys.argv[2].upper() == 'DEV':
                    sys.argv.pop(2)  

    dotenv_path = '.env.prod' if environment == 'production' else '.env.dev'
    load_dotenv(dotenv_path=dotenv_path)


    os.environ.setdefault('DJANGO_ENV', environment)
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")


    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    print(f"Starting Django server in {environment} environment...")
    execute_from_command_line(sys.argv)



if __name__ == "__main__":
    main()
