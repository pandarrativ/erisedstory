# Backend

### 1. Install dependencies
```
npm install
```
### 2. Setup database
Make sure MongoDB is installed and running on your system. Then, create a new database for this project. You can do this using the MongoDB shell or a GUI tool like MongoDB Compass.

### 3. Create .env file
```
touch .env
```  
In `.env` file, set the following variables:  
```
PORT=5000
MONGODB_URI=... (e.g., mongodb://127.0.0.1:27017)
JWT_SECRET_KEY=...
JWT_LIFETIME=120 days
```

### 4. Run for dev  
```
npm run dev
```

## 5. Access API doc
Once the server is running, you can access the API documentation at:
http://localhost:5000/api-docs
