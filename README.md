# FixItNow – Service Booking Platform

FixItNow is a full-stack service booking platform that allows customers to browse and book services, while enabling service providers to manage their offerings through a centralized system.

The project is built using modern frontend and backend technologies and is structured to support future DevOps practices such as containerization, CI/CD pipelines, and cloud deployment.

---

## 📌 Project Overview

- Backend: Spring Boot REST API  
- Frontend: React Single Page Application  
- Database: MySQL  
- Architecture: Decoupled frontend and backend  
- Status: Stable and ready for further deployment

---

## 🏗 Architecture

### Frontend (React SPA)
```

fixitnow/
├── src/
│   ├── App.jsx
│   ├── pages/
│   ├── components/
│   └── assets/
├── vite.config.js
└── tailwind.config.js

```

**Technologies**
- React 18
- React Router v6
- Tailwind CSS
- Vite

---

### Backend (Spring Boot API)
```

backend/
├── src/main/java/com/fixitnow/backend/
│   ├── Controller/
│   ├── Model/
│   ├── Repository/
│   ├── CorsConfig.java
│   └── BackendApplication.java
├── src/main/resources/
│   └── application.properties
└── pom.xml

```

**Technologies**
- Spring Boot 3.5.4
- Spring Data JPA
- Hibernate
- MySQL 8.0

---

## ⚙️ Prerequisites

- Java 17 or higher (tested with Java 21)
- Node.js 16+
- MySQL 8.0
- Maven

---

## 🗄 Database Configuration

The application uses **MySQL** as the primary database.

For security reasons, **database credentials are not stored in the repository**.  
Credentials are provided using **environment variables**.

### Required Environment Variables
- `DB_USERNAME`
- `DB_PASSWORD`

An example configuration file is included:
```

backend/src/main/resources/application.properties.example

````

---

## ▶️ Running the Application Locally

### 1️⃣ Set Environment Variables

#### Windows (PowerShell)
```powershell
setx DB_USERNAME your_db_username
setx DB_PASSWORD your_db_password
````

Restart the terminal after setting variables.

#### Linux / macOS / WSL

```bash
export DB_USERNAME=your_db_username
export DB_PASSWORD=your_db_password
```

---

### 2️⃣ Run Backend

```bash
cd backend
mvn clean package -DskipTests
java -jar target/demo-0.0.1-SNAPSHOT.jar --server.port=8091
```

Backend will start on:

```
http://localhost:8091
```

---

### 3️⃣ Run Frontend

```bash
cd fixitnow
npm install
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## 🔗 API Overview

### Health Check

```
GET /api/health
```

### Core Endpoints

```
GET  /api/category
POST /api/category

GET  /api/service
GET  /api/service/{id}
POST /api/service

GET  /api/booking
POST /api/booking

GET  /api/payment
POST /api/payment

GET  /api/review
POST /api/review
```

CORS is enabled for:

```
http://localhost:5173
```

---

## 🧪 Testing

* Backend tests executed using Maven
* Frontend production build verified using Vite
* APIs tested manually using browser and curl

---

## 🐳 Docker Support

The project is prepared for containerized deployment.

Basic usage:

```bash
docker-compose up -d
docker-compose down
```

Detailed instructions are available in `DOCKER_SETUP.md`.

---

## 🔧 Configuration

### Backend (`application.properties`)

```properties
server.port=8091

spring.datasource.url=jdbc:mysql://localhost:3306/fixitnowdb
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.open-in-view=false
```

### Frontend API Configuration

```javascript
export const API_BASE_URL = "http://localhost:8091/api";
```

For production environments:

```env
VITE_API_BASE_URL=http://your-api-domain.com/api
```

---

## ⚠️ Notes

* A non-critical Hibernate warning may appear at startup due to MySQL metadata queries.
* npm audit warnings may appear due to dependency constraints and can be addressed in future updates.

---

## 📌 Project Status

* Backend and frontend fully integrated
* Local testing completed successfully
* Ready for Docker, CI/CD, and cloud deployment

---

## 📅 Last Tested

* Environment: Windows 11, Java 21, MySQL 8.0
* Status: Stable and functioning as expected

---

## 📄 License

This project was developed for academic and learning purposes.

```

---

If you want next, I can:
- 🔥 Tune this for **WSO2 / DevOps internship**
- ⚙️ Add **CI/CD (GitHub Actions)**
- ☁️ Add **Terraform + AWS**
- 🧱 Add an **architecture diagram**

Just say the word 🚀
```
