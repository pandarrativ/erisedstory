# Django server for Panadarrativ

python 3.9.18

## Deployment

**Create venv**

create virtual environment using conda or python

1.using conda

```
conda create --name pdserver python=3.9
conda activate pdserver
```

2.using python

```
cd ~
python -m venv pdserver
source pdtalk/bin/activate
```


**Download dependencies**

```
cd pandaraTalk/backend
pip install -r requirements.txt
```
(pymongo does not support djongo 1.3.6, make sure pymongo==3.12.3)



**Download MongoDB and update**

For the first time run this app, you need to make migrations to mongodb
```
cd pandaraTalk/backend
python manage.py makemigrations
python manage.py migrate

```


**Add .env**


```
cd simulife/backend
sudo vim .env

create env files according to `.env.dev.example`



pip PyJWT



