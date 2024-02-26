# ErisedStory


## Frontend

### Download

For frontend, you may need to download node.js 20 +. After downloading it, enter the `/frontend` folder in your terminal and install all the dependencies

```shell
cd PATH_TO_THE_PROJECT  # enter the project folder
cd /frontend
npm install
```

After installing the dependencies, create a `.env` file (In VSCode, you can write click the the /frontend folder and select "NEW FILE" and then name it as ".env").

Write following line to .env file

```
REACT_APP_BACKEND_HOST="http://localhost:8000"
PORT=3000
```



### Project folders

Under the frontend folder, add your code into `/src` folder

`/src/App.js` The entrance of the application, set routes in this project

`/src/App.css` Global css settings





## Backend

### Download

Enter the `/backend` folder, create a python environment using Pyton==3.8 and download dependencies

```shell
cd /backend
conda create --name script_tool_env python=3.9
conda activate script_tool_env
pip install -r requirements.txt
```

Create a `.env` file and put your environment variables(sensitive information here) 

```.env
OPENAI_API_KEY="sk-...."
```



### Project folders

`/backend/users` All the backend api for users login/logout

`/backend/story_line` All the other api for this project

`/backend/story_line/ai_models/openai_api.py` The method to make requests to openai




=======
# Erised Story - v1

## Versions/Environment
node  v21.6.2 (tested on node v19 and it works)
npm v10.2.4
python 3


## First Settup

### Frontend

Create a `.env` file in your `/frontend` folder and add this line into it

```
REACT_APP_BACKEND_HOST="http://localhost:8000"
```

then run following command in your terminal

```shell
cd path_to_your_project/frontend
npm install
npm start
```





### Backend

Create a `.env` file in your `/backend` folder and add these lines into it  (Replace information ...)

```
OPENAI_API_KEY="..."
OPENAI_API_VERSION="."
OPENAI_API_ENDPOINT="."
```

Open a new terminal, then run following command in terminal

```shell
cd path_to_your_project/backend
conda create --name yourenvname python=3.9
conda activate yourenvname
pip install -r requirements.txt
python manage.py runserver
```


## Run if you finish settup before
Start backend server

```shell
cd path_to_your_project/backend
conda activate yourenvname
python manage.py runserver
```

Start frontend app
```shell
cd path_to_your_project/frontend
npm install
```
