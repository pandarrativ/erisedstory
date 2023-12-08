from flask import Flask, request, url_for
import requests
from . import db
import os
import json
from urllib.parse import urlparse, unquote
from flask_cors import CORS
import datetime
from werkzeug.utils import secure_filename
import logging
from logging import FileHandler
import time



def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        DEBUG=True,
        DATABASE_URI='database.db',
        SECRET_KEY='dev',
    )
    handler = FileHandler('app.log')
    app.logger.addHandler(handler)
    CORS(app, resources={r"/*": {"origins": "*"}})

    @app.route('/add_image', methods=['POST'])
    def add_image():
        data = request.data.decode('utf-8')
        data_dict = json.loads(data)

        url = data_dict['url']
        if not url:
            return 'Error: URL not provided'

        response = requests.get(url)
        if response.status_code != 200:
            return f'Error: Failed to fetch image from {url}'

        parsed_url = urlparse(url)
        file_path = unquote(parsed_url.path)
        file_name = os.path.basename(file_path)
        local_file_path = 'server/static/' + file_name
        try:
            with open(local_file_path, 'wb') as f:
                f.write(response.content)
        except FileExistsError:
            # TODO: Check if file is the same, or you can add random string until there is any difference between these two files
            return f'Error: File {local_file_path} already exists'

        description = data_dict['description']
        if not description:
            return 'Error: Description not provided'

        user_id = data_dict['user_id']
        if user_id is None:
            return 'Error: user_id not provided'

        database = db.get_db()
        database.execute("INSERT INTO images (user_id, description, file_path) VALUES (?, ?, ?)",
                         (user_id, description, local_file_path))
        database.commit()

        app.logger.info(str(time.time()) + ':add image ' + local_file_path)

        return {
            'image': get_image_url(file_name)
        }

    @app.route('/upload_image', methods=['post'])
    def upload_image():
        file = request.files['file']
        description = request.form.get('description')
        user_id = request.form.get('user_id')
        filename = secure_filename(file.filename)
        local_file_path = 'server/static/'+filename
        file.save(local_file_path)
        database = db.get_db()
        database.execute("INSERT INTO images (user_id, description, file_path) VALUES (?, ?, ?)",
                         (user_id, description, local_file_path))
        database.commit()
        app.logger.info(str(time.time()) + ':upload image ' + local_file_path)

        return {
            'image': get_image_url(filename)
        }

    @app.route('/register', methods=['POST'])
    def register():
        data = request.data.decode('utf-8')
        data_dict = json.loads(data)

        username = data_dict['username']
        if not username:
            return {
                'user_id': None,
                'message':'Username not provided'
            }

        password = data_dict['password']
        if not password:
            return {
                'user_id': None,
                'message':'Password not provided'
            }

        connection = db.get_db()
        cursor = connection.cursor()

        # Check if the username already exists in the database
        cursor.execute("SELECT id FROM user WHERE username = ?", (username,))
        existing_user = cursor.fetchone()
        if existing_user:
            return {
                'user_id': None,
                'message':'Username already exists'
            }

        # Insert the new user into the database
        cursor.execute("INSERT INTO user (username, password) VALUES (?, ?)",
                       (username, password))
        connection.commit()
        user_id = cursor.lastrowid

        app.logger.info(str(time.time()) + ':user register ' + str(user_id))
        return {
            'user_id': user_id,
        }

    @app.route('/login', methods=['POST'])
    def login():
        data = request.data.decode('utf-8')
        data_dict = json.loads(data)

        username = data_dict['username']
        if not username:
            return {
                'user_id': None,
                'message':'Username not provided'
            }
        password = data_dict['password']
        if not password:
            return {
                'user_id': None,
                'message':'Password not provided'
            }
        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM user WHERE username=? AND password=?", (username, password))
        user = cursor.fetchone()
        if user is not None:
            user_id = user[0]
            username = user[1]
        else:
            return {
                'user_id': None,
                'message':'The username or password you entered is incorrect.'
            }
        app.logger.info(str(time.time()) + ':user login ' + str(user_id))

        return {
            'user_id': user_id,
            'username': username,
        }

    @app.route('/get_records/<int:user_id>', methods=['GET'])
    def get_records(user_id):
        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM nightmare WHERE user_id=?", (user_id,))
        nightmares = cursor.fetchall()
        records = []
        for nightmare in nightmares:
            record = {
                'id': nightmare[0],
                'url': nightmare[5].split("|")[0],
                'tags': nightmare[6].split("|"),
                'title': nightmare[7],
                'isShow': True
            }
            records.append(record)
        app.logger.info(str(time.time()) + ':user get records' + str(user_id))

        return {
            'records': records,
        }

    @app.route('/get_record/<int:dream_id>', methods=['GET'])
    def get_record(dream_id):
        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM nightmare WHERE id=?", (dream_id,))
        dream = cursor.fetchone()
        record = {
            'date': dream[2],
            'description': dream[3],
            'rescripting': dream[4],
            'images': dream[5].split("|"),
            'tags': dream[6].split("|"),
            'title': dream[7]
        }
        app.logger.info(str(time.time()) + ':get record ' + str(dream_id))

        return {
            'record': record,
        }

    @app.route('/edit_record', methods=['POST'])
    def edit_record():
        data = request.data.decode('utf-8')
        data_dict = json.loads(data)

        user_id = data_dict['user_id']
        date = data_dict['date']
        description = data_dict['description']
        rescripting = data_dict['rescripting']
        images = '|'.join(data_dict['images'])
        tags = '|'.join(data_dict['tags'])
        title = data_dict['title']

        connection = db.get_db()
        cursor = connection.cursor()

        dream_id = data_dict['dream_id']
        if dream_id != '':
            cursor.execute("UPDATE nightmare SET date=?, description=?, rescripting=?, images=?, tags=?, title=? WHERE id=?",
                           (date, description, rescripting, images, tags, title, dream_id))
            app.logger.info(str(time.time()) + ':edit record: update dream ' + str(dream_id))

        else:
            date = datetime.datetime.now().strftime("%Y/%m/%d")
            cursor.execute(
                "INSERT INTO nightmare (user_id, date, description, rescripting,images, tags, title) VALUES (?, ?, ?, ?, "
                "?, ?, ?)",
                (user_id, date, description, rescripting, images, tags, title))
            app.logger.info(str(time.time()) + ':edit record: add dream ' + str(dream_id))
        connection.commit()
        dream_id = cursor.lastrowid


        return {
            'dream_id': dream_id,
        }

    def get_image_url(filename):
        img_url = url_for('static', filename=filename)
        return img_url

    from . import db
    db.init_app(app)

    return app

