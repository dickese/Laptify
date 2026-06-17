# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Laptify is a laptop e-commerce platform split into two independently-run apps in one repo:

- `Laptify-Backend/` — Java 21 / Spring Boot 4.0.5 REST API (Maven), MariaDB, Spring Security + JWT, Cloudinary for media.
- `Laptify-Frontend/` — React 19 + Vite 8 SPA, Redux Toolkit, Tailwind v4, shadcn/ui (radix).

User-facing text and many code comments are in Vietnamese — match that when editing UI strings.

## Commands

### Backend (run from `Laptify-Backend/`)
```bash
./mvnw spring-boot:run        # run dev server on :8080
./mvnw clean package          # build jar (target/*.jar)
./mvnw test                   # run tests
./mvnw test -Dtest=ClassName#methodName   # run a single test
```
Swagger UI: `http://localhost:8080/swagger-ui/index.html`

### Frontend (run from `Laptify-Frontend/`)
```bash
npm install
npm run dev        # Vite dev server (NOTE: README says `npm start`, but the actual script is `dev`)
npm run build
npm run lint       # eslint
npm run preview
```

## Configuration

- Backend config lives in `src/main/resources/application.yml` and is driven entirely by environment variables with inline defaults (e.g. `${DB_URL:jdbc:mariadb://localhost:3306/laptify_db}`). It runs with defaults if no env vars are set. `example.env` documents every variable (DB, JWT, Cloudinary), but Spring Boot does **not** auto-load a `.env` file — variables must be present in the actual process environment.
- JPA `ddl-auto: update` — Hibernate auto-migrates the schema from entities on startup. `src/main/java/.../db/schema.sql` and `db/sample_data.sql` are manual seed scripts, not Flyway/Liquibase migrations.
- Frontend hardcodes the API base URL `http://localhost:8080/api` in `src/lib/axiosClient.js`.

## Backend architecture

Package root: `fit.iuh.laptify_backend`. Organized by **feature module**, not by layer. Each domain package (`auth`, `product`, `cart`, `order`, `wishlist`, `media`) is self-contained with its own `controller/`, `dto/{request,response,common}/`, `entity/`, `repository/`, `service/` + `service/impl/`.

Conventions to follow when adding code:
- Services are interface + `impl/` pair (e.g. `ProductService` / `ProductServiceImpl`).
- Each module carries its **own copy** of `dto/common/ApiResponse` and `ErrorResponse` (they are duplicated across `auth` and `product`, etc.) — there is no shared common module. `ApiResponse<T>` is `{ code, message, data }`.
- Cross-cutting error handling is centralized in `advice/GlobalExceptionHandler` (`@RestControllerAdvice`), mapping custom exceptions in `advice/exception/` (`BadRequestException`, `BusinessException`, `ResourceAlreadyExisted`, `UnauthorizedException`) to HTTP statuses with an `ApiResponse` body.
- Dynamic product filtering uses JPA Specifications: `product/repository/ProductSpecification.java` built from `ProductCriteria`/`ProductFilter`.
- Lombok is used throughout (`@RequiredArgsConstructor` constructor injection, `@Builder`, etc.).

### Security model (important — non-obvious)
- `SecurityConfig` sets `anyRequest().permitAll()` and stateless sessions. There is **no URL-based authorization and no `@PreAuthorize`** in the backend. The endpoints are effectively open at the Spring Security layer.
- `JwtAuthenticationFilter` parses a `Bearer` token (if present), validates it, and populates `SecurityContext` with a `UserPrincipal` + role authority. Controllers read the current user via `@AuthenticationPrincipal`. An invalid/missing token does **not** reject the request — it just leaves the context unauthenticated.
- Role/access enforcement currently happens mostly on the **frontend** (`ProtectedRoute`). Keep this in mind: a security change usually means adding method/URL authorization on the backend, not just guarding a route.
- Tokens: short-lived access token (JWT) returned in the login body; refresh token issued as an HttpOnly `REFRESH_TOKEN` cookie. `/api/v1/auth/refresh-token` rotates it. Entities `RefreshToken`, `Role`, `RoleName`, `User`, `UserPrincipal` live in `auth/entity/`.

## Frontend architecture

- `@/` is aliased to `src/` (configured in both `vite.config.js` and `jsconfig.json`).
- **State**: Redux Toolkit store in `src/feature/store.js` with slices `auth`, `cart`, `checkout`, `wishlist`. Each feature folder pairs a `*Slice.js` (reducers) with a `*Thunk.js` (async API calls).
- **API layer**: `src/services/*Api.js` (one file per backend domain) all call through the shared `src/lib/axiosClient.js`. Do not create new axios instances — reuse `axiosClient`.
  - Request interceptor attaches `Authorization: Bearer <accessToken>` from `localStorage` (skipped for `/auth/login` and `/auth/register`).
  - Response interceptor auto-refreshes on `401` (calls `/v1/auth/refresh-token` with the cookie via a raw axios call to avoid interceptor recursion), retries once, then redirects to `/login` on failure.
  - Use the exported `getErrorMessage(err, default)` helper to surface backend error messages.
- **Routing**: `src/router/router.jsx` (react-router v7 `createBrowserRouter`). Two trees: public/client routes under `/`, and admin routes under `/admin` wrapped in `<ProtectedRoute allowedRoles={['ADMIN']}>`. Individual client routes (cart, wishlist, profile, order-history) are wrapped in `<ProtectedRoute>`.
- **Pages** are grouped by audience under `src/pages/{client,user,admin,common}/`. **UI components**: `src/components/ui/` is shadcn/radix (managed via `components.json`, style `radix-nova`); custom shared components in `src/components/custom/`. Styling is Tailwind v4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js`).
```