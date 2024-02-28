# Backend

**1. Setup**  
    ```
    npm install
    ```

**2. Creating .env file**  
    ```
    cp .env
    ```  
    In .env file, set the following variables:  
    ```
    PORT=5000
    MONGODB_URI=... (e.g., mongodb://127.0.0.1:27017)
    JWT_SECRET_KEY=...
    JWT_LIFETIME=120 days
    ```

**3. Running for dev**  
    ```
    npm run dev
    ```

**4. Visiting API docs**  
    http://localhost:5000/api-docs
