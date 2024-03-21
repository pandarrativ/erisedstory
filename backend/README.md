# erisedstory-backend

## 1 Backend setup
### 1.1 Install dependencies
```
npm install
```
### 1.2 Setup database
Make sure MongoDB is installed and running on your system. Then, create a new database for this project. You can do this using the MongoDB shell or a GUI tool like MongoDB Compass.

### 1.3 Setup .env file
In `.env.example` file, set all the variables. Rename this file to `.env`.

### 1.4 Run for dev  
```
npm run dev
```

### 1.5 Access API doc
Once the server is running, you can access the API documentation at:
```
http://localhost:${PORT}/api-docs
```

<br>

## 2 APIs
`/api/v1`
### auth
| Method | Route | Role access |
|----|---|---|
| `POST` | `/auth/register` | All (`admin` registration will be restricted later) |
| `POST` | `/auth/login` | All |
| `POST` | `/auth/logout` | All |
| `GET` | `/auth/google` | All |

---------------------Draft--------------------------

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