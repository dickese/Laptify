# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Laptify-Backend is the REST API for a laptop e-commerce platform: Java 21 / Spring Boot 4.0.5 (Maven), MariaDB via Spring Data JPA/Hibernate, Spring Security + JWT, and Cloudinary for media storage. It serves the `Laptify-Frontend/` React SPA (sibling directory). User-facing messages and many comments are in Vietnamese — match that when editing.

## Commands

```bash
./mvnw spring-boot:run        # run dev server on :8080
./mvnw clean package          # build jar -> target/*.jar (skip tests: -DskipTests)
./mvnw test                   # run tests
./mvnw test -Dtest=ClassName#methodName   # run a single test
```
Swagger UI: `http://localhost:8080/swagger-ui/index.html`

Docker: a multi-stage `Dockerfile` builds and runs the jar (expects MariaDB reachable at host `db`, profile `prod`).

## Configuration

- All config lives in `src/main/resources/application.yml`, driven entirely by environment variables with inline defaults (e.g. `${DB_URL:jdbc:mariadb://localhost:3306/laptify_db}`). It boots with defaults if no env vars are set. `example.env` documents every variable (DB, JWT, Cloudinary).
- Spring Boot does **not** auto-load a `.env` file despite the README — variables must exist in the actual process environment.
- JPA `ddl-auto: update`: Hibernate auto-migrates the schema from entities on startup. `src/main/java/.../db/schema.sql` and `db/sample_data.sql` are manual seed scripts, **not** Flyway/Liquibase migrations — they are not run automatically.

## Architecture

Package root: `fit.iuh.laptify_backend`. Organized by **feature module**, not by layer. Each domain package (`auth`, `product`, `cart`, `order`, `wishlist`, `media`) is self-contained with its own `controller/`, `dto/{request,response,common}/`, `entity/`, `repository/`, `service/` + `service/impl/`. The `media` module has no entity/repository (it proxies to Cloudinary instead).

Conventions to follow when adding code:
- Services are interface + `impl/` pair (e.g. `ProductService` / `impl/ProductServiceImpl`).
- Each module carries its **own copy** of `dto/common/ApiResponse` and `ErrorResponse` — they are duplicated across modules; there is no shared common module. `ApiResponse<T>` is `{ code, message, data }`.
- Cross-cutting error handling is centralized in `advice/GlobalExceptionHandler` (`@RestControllerAdvice`), mapping custom exceptions in `advice/exception/` (`BadRequestException`, `BusinessException`, `ResourceAlreadyExisted`, `UnauthorizedException`) plus `EntityNotFoundException` / `BadCredentialsException` to HTTP statuses with an `ApiResponse` body.
- Dynamic, filterable list queries use JPA Specifications built from a criteria/filter DTO: see `product/repository/ProductSpecification.java` (from `ProductCriteria`/`ProductFilter`) and `order/repository/OrderSpecification.java` (from `OrderFilter`).
- Lombok is used throughout: `@RequiredArgsConstructor` for constructor injection, `@Builder`, `@Getter/@Setter`.
- Controllers are versioned under `/api/v1/...` (e.g. `/api/v1/auth`).

### Security model (important — non-obvious)
- `auth/config/security/SecurityConfig` sets `anyRequest().permitAll()` with stateless sessions. There is **no URL-based authorization and no `@PreAuthorize`** in the codebase — endpoints are effectively open at the Spring Security layer.
- `auth/service/JwtAuthenticationFilter` parses a `Bearer` token if present, validates it, and populates `SecurityContext` with a `UserPrincipal` + role authority. A missing/invalid token does **not** reject the request — it just leaves the context unauthenticated. Controllers read the current user via `@AuthenticationPrincipal UserPrincipal`.
- Role enforcement currently happens on the **frontend**, not here. A real authorization change means adding method/URL security on the backend, not relying on the filter.
- Tokens: short-lived access JWT returned in the login response body; refresh token issued as an HttpOnly `REFRESH_TOKEN` cookie and persisted via the `RefreshToken` entity. `POST /api/v1/auth/refresh-token` rotates it. JWT logic lives in `auth/service/JwtTokenProvider` (Nimbus JOSE); settings in `auth/config/JwtProperties` bound from `security.jwt.*`.

## Tests

Only `LaptifyBackendApplicationTests` (Spring context-load smoke test) exists — there is no real test suite yet. Security/JPA/WebMVC test starters are on the classpath (`spring-boot-starter-*-test`) if you add tests.