# Verification Checklist

## Before Running Tests

### 1. Type Compilation
```bash
# Check for TypeScript errors
cd apps/admin-api
tsc --noEmit

cd ../stores-api
tsc --noEmit
```

**Expected:** No TypeScript errors

### 2. Environment Variables
Create `.env` file with:
```
NODE_ENV=development
PORT=3001
MONGO_URL=mongodb://localhost:27017/store-api
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_BUCKET_NAME=your-bucket
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Startup Test
```bash
npm run api-admin:dev
```

**Expected Output:**
```
✅ Environment variables validated successfully
✅ Server running on port 3001
```

### 4. Health Check
```bash
curl http://localhost:3001/healthCheck
```

**Expected Response:**
```json
{
  "data": {
    "status": "healthy",
    "uptime": 5.23,
    "timestamp": "2026-06-18T12:34:56.789Z",
    "services": {
      "mongodb": true
    }
  },
  "status": 200
}
```

---

## Functional Tests

### 5. Rate Limiting
```bash
# Test auth endpoint - should allow 50 requests per 15 min
for i in {1..51}; do
  curl -X POST http://localhost:3001/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test"}'
done
```

**Expected:** 51st request returns 429 (Too Many Requests)

### 6. Type Safety (Auth)
```bash
# Test invalid token
curl -H "Authorization: Bearer invalid_token" \
  http://localhost:3001/api/user/profile
```

**Expected Response:**
```json
{
  "error": "Invalid token",
  "status": 401
}
```

### 7. MongoDB Retry
```bash
# Stop MongoDB, start app, it should retry
docker stop mongodb  # or stop your mongo instance
npm run api-admin:dev
```

**Expected Logs:**
```
❌ MongoDB connection failed (attempt 1/5): ...
🔄 Retrying in 5000ms...
❌ MongoDB connection failed (attempt 2/5): ...
...
```

### 8. Logging
Check logs directory:
```bash
ls -la logs/
cat logs/combined.log      # JSON formatted logs
cat logs/error.log         # Error logs only
```

**Expected:** Structured JSON logs with timestamps

### 9. Error Handling
```bash
# Test non-existent route
curl http://localhost:3001/api/nonexistent
```

**Expected:**
- Logs the error
- Returns proper JSON response
- No stack trace in production

---

## Code Quality Checks

### 10. No More `any` Types
```bash
grep -r ":\s*any" apps/admin-api/src \
  --include="*.ts" \
  --exclude-dir=node_modules
```

**Expected:** No matches (except in comments)

### 11. Error Handler Middleware
```bash
grep -r "errorHandler" apps/admin-api/src/config/app.ts
```

**Expected:** Middleware is imported and registered

### 12. Environment Validation
```bash
# Test missing env var
unset MONGO_URL
npm run api-admin:dev
```

**Expected:** Clear error message and process exits with code 1

---

## Performance Checks

### 13. Startup Time
```bash
time npm run api-admin:dev
```

**Expected:** Should start in < 5 seconds

### 14. Log File Size
```bash
ls -lh logs/
```

**Expected:** Files are created and rotated as configured

---

## Security Checks

### 15. Rate Limit Headers
```bash
curl -I http://localhost:3001/api/products
```

**Expected Headers:**
```
RateLimit-Limit: 500
RateLimit-Remaining: 499
RateLimit-Reset: 1234567890
```

### 16. Helmet Security Headers
```bash
curl -I http://localhost:3001/api/products
```

**Expected Headers:**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=15552000; includeSubDomains
```

---

## Integration Tests

### 17. Full Auth Flow
```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Use token
TOKEN=$(previous_response.accessToken)
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/user/profile
```

**Expected:** All requests succeed with proper responses

---

## Cleanup & Documentation

### 18. Remove TODO Comments
```bash
grep -r "TODO\|FIXME" apps/admin-api/src --include="*.ts"
```

**Expected:** None (or documented in issue tracker)

### 19. Update README
- [ ] Document environment variables
- [ ] Document rate limiting
- [ ] Document logging setup
- [ ] Document error handling
- [ ] Document Redis status

---

## Final Sign-Off

- [ ] All type compilation passes
- [ ] App starts successfully
- [ ] Health check endpoint works
- [ ] Rate limiting works
- [ ] Error handling is consistent
- [ ] Logs are created correctly
- [ ] Security headers present
- [ ] No `any` types remain
- [ ] Environment validation works
- [ ] MongoDB retry logic works

**Status:** ✅ All checks passing  
**Date:** [Fill in date]  
**Reviewer:** [Fill in name]  
**Ready for Production:** [Yes/No]

