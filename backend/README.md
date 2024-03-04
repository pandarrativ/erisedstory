# Backend

## 1 Setup
### 1.1 Install dependencies
```
cd backend
npm install
```
### 1.2 Setup database
Make sure MongoDB is installed and running on your system. Then, create a new database for this project. You can do this using the MongoDB shell or a GUI tool like MongoDB Compass.

### 1.3 Create .env file
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

### 1.4 Run for dev  
```
npm run dev
```

### 1.5 Access API doc
Once the server is running, you can access the API documentation at:
http://localhost:5000/api-docs

<br>

## 2 APIs
`http://localhost:5000/api/v1`
### auth
| Method | Route | Role access |
|----|---|---|
| `POST` | `/auth/register` | All (`admin` registration will be restricted later) |
| `POST` | `/auth/login` | All |
| `POST` | `/auth/logout` | All |

### user
| Method | Route | Role access |
|----|---|---|
| `GET`, `PUT`, `PATCH` | `/user/info` | All |

--- 
### survey
| Method | Route | Role access |
|----|---|---|

### kid
| Method | Route | Role access |
|----|---|---|
| `GET`, `POST` | `/kid` | `parent` |
| `PUT`, `PATCH` | `/kid/profile` | `parent` |

### story
| Method | Route | Role access |
|----|---|---|
| `GET`, `POST` | `/stories` | `parent` |
| `GET`, `DELETE` | `/stories/:id` | `parent` |

--- 

### educator
| Method | Route | Role Access |
|----|---|---|
| `GET`, `POST`,`PUT`, `PATCH` | `/educator/profile` | `educator` |
| `GET` | `/educator/kids` | `educator` |
| `GET` | `/educator/kids/:id` | `educator` |

--- 
### admin
| Method | Route | Role Access |
|----|---|---|
| `GET` | `/admin/parents` | `admin` |
| `GET`, `PATCH` | `/admin/parents/:id` | `admin` |
| `GET` | `/admin/educators` | `admin` |
| `GET`, `PATCH` | `/admin/educators/:id` | `admin` |
| `GET` | `/admin/kids` | `admin` |
| `GET`, `PATCH` | `/admin/kids/:id` | `admin` |