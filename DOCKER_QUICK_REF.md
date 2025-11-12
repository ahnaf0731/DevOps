# Docker Quick Reference - FixItNow

## Files Created

```
Trail/
├── backend/
│   ├── Dockerfile           ✅ Multi-stage Maven → Java 21 JRE
│   └── .dockerignore        ✅ Exclude build artifacts
│
├── fixitnow/
│   ├── Dockerfile           ✅ Multi-stage Node → Nginx
│   ├── nginx.conf          ✅ SPA routing + API proxy
│   ├── .dockerignore       ✅ Exclude node_modules
│   └── .env.example        ✅ Environment template
│
├── docker-compose.yml      ✅ MySQL + Backend + Frontend
└── DOCKER_SETUP.md        ✅ Complete Docker guide
```

---

## 🚀 Start Everything

```bash
# From project root
docker-compose up -d

# Wait 30-40 seconds for everything to start
docker-compose ps

# View logs
docker-compose logs -f
```

**Then access:**
- Frontend: http://localhost
- Backend: http://localhost:8091 (or http://localhost/api from frontend)
- MySQL: localhost:3306

---

## 🛑 Stop Everything

```bash
docker-compose down          # Stop containers
docker-compose down -v       # Stop + remove data
```

---

## 📊 Service Details

| Service | Port | Status | Health Check |
|---------|------|--------|--------------|
| Frontend | 80 | http://localhost | /health |
| Backend | 8091 | http://localhost:8091/api/health | /api/health |
| MySQL | 3306 | localhost:3306 | mysqladmin ping |

---

## 🔧 Build Individual Images

```bash
# Backend only
cd backend
docker build -t fixitnow-backend:latest .

# Frontend only
cd fixitnow
docker build -t fixitnow-frontend:latest .
```

---

## 📋 Common Commands

```bash
# View running containers
docker-compose ps

# View logs (all services)
docker-compose logs

# Logs for specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Follow logs live
docker-compose logs -f backend

# Execute command in container
docker-compose exec backend curl http://localhost:8091/api/health
docker-compose exec db mysql -u root -pAhnaf111# -e "SHOW DATABASES;"

# Rebuild and restart
docker-compose build backend
docker-compose up -d backend
```

---

## 🔒 Environment Variables

**Backend (auto-set by docker-compose):**
- SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/fixitnowdb
- SPRING_DATASOURCE_USERNAME: root
- SPRING_DATASOURCE_PASSWORD: Ahnaf111#
- SPRING_JPA_HIBERNATE_DDL_AUTO: update

**Frontend (optional in fixitnow/.env.local):**
- VITE_API_BASE_URL: /api (in Docker)

---

## 💾 Database Backup/Restore

```bash
# Backup
docker run --rm -v mysql_data:/data -v $(pwd):/backup \
  busybox tar czf /backup/mysql_backup.tar.gz -C /data .

# Restore
docker-compose down -v
docker run --rm -v mysql_data:/data -v $(pwd):/backup \
  busybox tar xzf /backup/mysql_backup.tar.gz -C /data
docker-compose up -d
```

---

## 🐛 Troubleshooting

**Backend won't connect to database:**
```bash
docker-compose logs db
docker-compose exec backend curl http://localhost:8091/api/health
```

**Frontend showing errors:**
```bash
docker-compose logs frontend
docker-compose exec frontend nginx -t
```

**Port 80/8091 already in use:**
- Edit docker-compose.yml ports
- Or kill conflicting process

**Full reset:**
```bash
docker-compose down -v
docker system prune
docker-compose up -d
```

---

## 📦 Image Sizes

- Backend: ~300-400 MB (includes JRE)
- Frontend: ~50-60 MB (nginx)
- MySQL: ~400 MB

**Total:** ~750-860 MB

---

## 🚢 Push to Registry (optional)

```bash
docker tag fixitnow-backend:latest username/fixitnow-backend:v1.0.0
docker push username/fixitnow-backend:v1.0.0

docker tag fixitnow-frontend:latest username/fixitnow-frontend:v1.0.0
docker push username/fixitnow-frontend:v1.0.0
```

---

## 📚 Full Documentation

See `DOCKER_SETUP.md` for complete guide including:
- Detailed service descriptions
- Environment configuration
- Networking explained
- Data persistence
- Production deployment
- Security best practices
- Troubleshooting guide

---

**Your FixItNow project is now dockerized! 🐳**

