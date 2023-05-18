# Assignment

LIFEPACK

## Validation via DTO

Global [ValidationPipeline](./api/src/main.ts) enabled and requests to APIs are validated via [DTOs](./api/src/user/dto).  

### DB migrations

`TypeORM` DB migrations are already set up for you in [./api/src/db/migrations](./api/src/db/migrations) folder.

To generate new migration run:

```console
npm run migrations:new -- src/db/migrations/Roles
```

To apply migrations run:

```console
npm run migrations:up
```

To revert migrations run:

```console
npm run migrations:revert
```

### Redis cache

[cache-manager](https://github.com/BryanDonovan/node-cache-manager#readme) package with Redis store is available in [app-cache.module.ts](./api/src/app-cache/app-cache.module.ts).

So it is possible to use [`CacheInterceptor`](./api/src/user/user.controller.ts#L50) above you controller methods or classes:

```typescript
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getUsers() {}
```

Or inject `CacheManager` and use it directly:

```typescript
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

await this.cacheManager.get('key');

### Automatic APIs documentation with Swagger

Nest.js swagger module configured with the use of [Swagger CLI plugin](https://docs.nestjs.com/openapi/cli-plugin).

API docs are generated with the start of app server automatically and available at [http://localhost:3000/api](http://localhost:3000/api):

<img width="1485" alt="Swagger doc generated" src="https://user-images.githubusercontent.com/5843270/143483373-a0f3fd48-4f27-4d53-9b8f-6b80bc147d48.png">

## Installation

### Prerequisites

- Docker for Desktop
- Node.js LTS

- Run docker containers (DB, Redis, etc)

```console
cd nestjs-starter-kit/.docker-node-api
docker-compose up -d
```

- Go to api folder and copy env file

```console
cd ../api
cp .env.example .env
```

- Update .env file with credentials if needed

- Next install dependencies

```console
npm ci
```

- Init config and run migrations

```console
npm run migrations:up
```

- Run application

```console
npm start
