# Seva Backend

## Setup

1. Create `.env` in `Backend/` based on:
```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/seva
JWT_SECRET=replace_with_strong_secret
CORS_ORIGIN=http://localhost:5173
```

2. Install and run:
```
cd Backend
npm i
npm run dev
```

Health: `GET /health`

Auth:
- POST `/api/auth/register` { name, email, password, role }
- POST `/api/auth/login` { email, password }
- GET `/api/auth/me` Authorization: Bearer <token>
