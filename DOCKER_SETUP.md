# Docker Setup Guide for FixItNow

This guide explains how to containerize and run the FixItNow application using Docker and Docker Compose.

## 📋 Prerequisites

- Docker (v20.10+)
- Docker Compose (v2.0+)
- 3+ GB of available disk space

## 🏗️ Project Structure

```
Trail/
├── backend/
│   ├── Dockerfile           # Multi-stage build for Spring Boot
│   ├── .dockerignore        # Exclude unnecessary files
│   ├── pom.xml
│   └── src/
│
├── fixitnow/
│   ├── Dockerfile           # Multi-stage build for React + Nginx
│   ├── .dockerignore
│   ├── nginx.conf           # Nginx configuration with SPA routing
│   ├── package.json
│   └── src/
│
├── docker-compose.yml       # Orchestrate all services
└── README.md
```

## 🚀 Quick Start with Docker Compose

The easiest way to run the entire stack:

```bash
# From project root directory
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove data (including MySQL data)
docker-compose down -v
```

**Access:**
- Frontend: http://localhost
- Backend API: http://localhost/api
- MySQL: localhost:3306 (root/Ahnaf111#)

---

## 🔨 Building Individual Docker Images

### Backend

```bash
cd backend

# Build image
docker build -t fixitnow-backend:latest .

# Run container
docker run -d \
  --name fixitnow-backend \
  -p 8091:8091 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/fixitnowdb \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=Ahnaf111# \
  fixitnow-backend:latest

# Check logs
docker logs fixitnow-backend

# Stop container
docker stop fixitnow-backend
```

### Frontend

```bash
cd fixitnow

# Build image
docker build -t fixitnow-frontend:latest .

# Run container
docker run -d \
  --name fixitnow-frontend \
  -p 80:80 \
  fixitnow-frontend:latest

# Access: http://localhost
```

---

## 📊 Docker Images

### Backend Image
- **Base Image:** `eclipse-temurin:21-jre` (lightweight Java runtime)
- **Build Stage:** `maven:3.9-eclipse-temurin-21` (compile with Maven)
- **Size:** ~300-400 MB
- **Port:** 8091
- **Health Check:** `/api/health` endpoint

### Frontend Image
- **Build Stage:** `node:21-alpine` (compact Node.js)
- **Runtime Stage:** `nginx:alpine` (lightweight web server)
- **Size:** ~50-60 MB
- **Port:** 80
- **SPA Routing:** Configured for React Router

### Database Image
- **Image:** `mysql:8.0` (official MySQL)
- **Port:** 3306
- **Data:** Persisted in Docker volume

---

## 🌐 Docker Compose Services

### 1. Database (db)
```yaml
Service: mysql:8.0
Container: fixitnow-mysql
Port: 3306
Volume: mysql_data (persistent)
Healthcheck: MySQL ping every 10s
```

### 2. Backend (backend)
```yaml
Service: Spring Boot application
Container: fixitnow-backend
Port: 8091
Environment Variables: Database connection
Depends On: db service
Healthcheck: /api/health endpoint
```

### 3. Frontend (frontend)
```yaml
Service: Nginx serving React app
Container: fixitnow-frontend
Port: 80
Proxy: /api/* → backend:8091/api/*
Depends On: backend service
```

---

## 🔧 Environment Configuration

### Backend Environment Variables
Set in `docker-compose.yml` or via `.env` file:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/fixitnowdb
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=Ahnaf111#
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false
SPRING_DEVTOOLS_RESTART_ENABLED=false
```

### Frontend Environment Variables
Create `fixitnow/.env.local`:

```env
# Development (local host)
VITE_API_BASE_URL=http://localhost:8091/api

# Docker Compose (relative path - nginx proxy)
VITE_API_BASE_URL=/api
```

---

## 📡 Networking

Docker Compose automatically creates a bridge network (`fixitnow-network`) where:
- Backend can reach database at: `jdbc:mysql://db:3306/...`
- Frontend (Nginx) can reach backend at: `http://backend:8091/...`
- All services communicate via service names

---

## 💾 Data Persistence

### MySQL Volume
```yaml
volumes:
  mysql_data:
    driver: local
```

**Location:**
- Windows: `\\wsl$\docker-desktop-data\mnt\wsl\docker-desktop-data\data\docker\volumes\<volume_id>\_data`
- Linux: `/var/lib/docker/volumes/<volume_id>/_data`
- Mac: `~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw`

**To backup:**
```bash
docker run --rm -v mysql_data:/data -v $(pwd):/backup \
  busybox tar czf /backup/mysql_backup.tar.gz -C /data .
```

**To restore:**
```bash
docker run --rm -v mysql_data:/data -v $(pwd):/backup \
  busybox tar xzf /backup/mysql_backup.tar.gz -C /data
```

---

## 🔍 Useful Docker Commands

### View Running Containers
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Follow logs (live)
docker-compose logs -f backend
```

### Execute Commands in Container
```bash
# Backend
docker-compose exec backend ls /app
docker-compose exec backend curl http://localhost:8091/api/health

# Frontend
docker-compose exec frontend nginx -t
docker-compose exec frontend ls /usr/share/nginx/html

# Database
docker-compose exec db mysql -u root -pAhnaf111# -e "SHOW DATABASES;"
```

### Rebuild Images
```bash
# Rebuild all images
docker-compose build

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Rebuild without cache
docker-compose build --no-cache
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check logs
docker-compose logs backend

# Verify database is healthy
docker-compose exec db mysqladmin ping -u root -pAhnaf111#

# Check database connection
docker-compose exec backend curl http://localhost:8091/api/health
```

### Frontend shows "Cannot GET /"
```bash
# Check nginx config
docker-compose exec frontend nginx -t

# Restart frontend
docker-compose restart frontend

# Check frontend logs
docker-compose logs frontend
```

### API calls fail from frontend
```bash
# Verify backend is reachable
docker-compose exec frontend curl http://backend:8091/api/category

# Check nginx proxy config
docker-compose exec frontend cat /etc/nginx/nginx.conf | grep -A 10 "location /api"
```

### Port already in use
```bash
# Find what's using port 80
netstat -ano | findstr :80

# Use different ports
docker run -p 8080:80 fixitnow-frontend:latest
```

### Database connection issues
```bash
# Check MySQL is running
docker-compose ps db

# Connect to MySQL directly
docker-compose exec db mysql -u root -pAhnaf111#

# Check database exists
docker-compose exec db mysql -u root -pAhnaf111# -e "SHOW DATABASES;"
```

---

## 📦 Production Deployment

### Environment-Specific Compose Files

**docker-compose.prod.yml** (for production):
```yaml
version: '3.8'

services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}  # Use secrets
      MYSQL_DATABASE: fixitnowdb
    volumes:
      - mysql_data:/var/lib/mysql
    # Add: restart: always
    # Add: logging configuration

  backend:
    image: fixitnow-backend:v1.0.0  # Use versioned image
    environment:
      SPRING_DATASOURCE_URL: ${DB_URL}  # Use environment variables
      # ... other vars from .env
    restart: always
    # Add: resource limits
    # Add: logging

  frontend:
    image: fixitnow-frontend:v1.0.0
    restart: always
    # Add: nginx SSL config
    # Add: logging
```

**Run production stack:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Docker Registry (Push to Docker Hub or AWS ECR)

```bash
# Tag images
docker tag fixitnow-backend:latest myusername/fixitnow-backend:v1.0.0
docker tag fixitnow-frontend:latest myusername/fixitnow-frontend:v1.0.0

# Push to Docker Hub
docker push myusername/fixitnow-backend:v1.0.0
docker push myusername/fixitnow-frontend:v1.0.0

# Pull on production server
docker pull myusername/fixitnow-backend:v1.0.0
```

---

## 🔒 Security Best Practices

1. **Use secrets for passwords:**
   ```bash
   docker secret create mysql_password -
   ```

2. **Run containers as non-root:**
   Add to Dockerfile:
   ```dockerfile
   RUN useradd -m appuser
   USER appuser
   ```

3. **Limit resource usage:**
   ```yaml
   services:
     backend:
       deploy:
         resources:
           limits:
             cpus: '1'
             memory: 512M
   ```

4. **Update base images regularly:**
   ```bash
   docker pull maven:3.9-eclipse-temurin-21
   docker pull eclipse-temurin:21-jre
   docker pull nginx:alpine
   docker pull mysql:8.0
   ```

---

## 📝 Useful Aliases

Add to your shell profile:

```bash
alias dc='docker-compose'
alias dcup='docker-compose up -d'
alias dcdown='docker-compose down'
alias dclogs='docker-compose logs -f'
alias dcbuild='docker-compose build'
```

---

## 📞 Support

For Docker issues:
- Check Docker daemon is running: `docker ps`
- Verify Docker Compose version: `docker-compose --version`
- View system info: `docker system info`

---

**Happy containerizing!** 🐳

