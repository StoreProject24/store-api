# Redis Status

## Current State
Redis caching is **disabled** but partially implemented in the codebase.

## Files Related to Redis
- `apps/admin-api/src/config/redis/redis.ts` - Redis client configuration
- `apps/admin-api/src/modules/stores/utils/storeRedis.ts` - Store caching utilities
- `apps/admin-api/src/modules/stores/domain/store.domain.ts` - Redis calls commented out

## Decisions to Make

### Option 1: Remove Redis (Recommended for now)
If Redis is not needed:
1. Delete `src/config/redis/redis.ts`
2. Delete `src/modules/stores/utils/storeRedis.ts`
3. Remove commented imports from domain files
4. Remove `redis` dependency from `package.json`

### Option 2: Enable Redis
If caching is needed:
1. Set `REDIS_URL` in `.env`
2. Uncomment Redis initialization in `src/config/app.ts`
3. Uncomment Redis calls in domain files
4. Add proper error handling for Redis connection failures

## Recommendation
**Remove Redis** unless you have a specific performance requirement for caching.
The application works fine without it, and removing it reduces:
- Dependencies
- Maintenance complexity
- Infrastructure requirements

Update this file once decision is made.
