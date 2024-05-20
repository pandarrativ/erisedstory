from pathlib import Path
import os


SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG') == 'True'  
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS').split(',')
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS').split(',')


INSTALLED_APPS = [
    # Settings
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'rest_framework',
    'corsheaders',

    # Utilities
    'common_utils',  # for utils, database connections, shared by all apps
    'ai_models',  # for API request with AI models, shared by all apps

    # Apps
    'pdtalk',
    'erised',
]


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]



ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'pandara_db',
    },
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"




if os.getenv('DJANGO_ENV') == 'production':
    STATIC_URL = os.getenv('STATIC_URL')
    STATIC_ROOT = os.getenv('STATIC_ROOT')

    CORS_ALLOW_CREDENTIALS = True
else:
    BASE_DIR = Path(__file__).resolve().parent.parent
    STATICFILES_DIRS = [BASE_DIR / os.getenv('STATICFILES_DIRS')]
    STATIC_URL = os.getenv('STATIC_URL')



# Production
# STATIC_URL = '/static/'
# STATIC_ROOT = '/var/www/pdtalk/backend/static' 

# ALLOWED_HOSTS = ['.pandarrativ.com']
# CORS_ALLOWED_ORIGINS = [
#     "http://pandarrativ.com",
#     "http://pdtalk.pandarrativ.com",
# ]
# DEBUG = False



# Development
# STATICFILES_DIRS = [BASE_DIR / "static"]
# STATIC_URL = '/static/'

# ALLOWED_HOSTS = ['localhost']
# CORS_ALLOWED_ORIGINS = [
#   "http://localhost:3000",
# ]
# DEBUG = True


