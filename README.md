# Car Show Registration System ("Car Show 2027")

A modern, full-stack event registration management application for AutoVista Events' **Car Show 2027** at Sorsogon City Coliseum.

## Project Team & Roles

| Member | Role | Responsibility |
|---|---|---|
| **Aldrien Hilot** | Backend Developer | C# / ASP.NET Core (.NET 10) Minimal API, Vertical Slice Architecture, EF Core SQLite, FluentValidation, Scalar |
| **Zyrene Lacaste** | Frontend Developer | React JS (Vite), Tailwind CSS, Lucide Icons, Dashboard UI, Filtering & Pagination |

---

## Architecture Overview

- **Backend (`backend/`)**:
  - ASP.NET Core Minimal APIs (.NET 10) using **Vertical Slice Architecture**
  - **Domain**: Single domain entity `Registration`, domain enums (`RegistrationType`, `Status`, `PaymentStatus`), `Result<T>` pattern
  - **Application**: Feature slices (`CreateRegistration`, `GetRegistrations`, `GetRegistrationById`, `GetRegistrationSummary`), CQRS abstractions (`ICommand`, `IQuery`), FluentValidation
  - **Infrastructure**: Entity Framework Core with SQLite (`carshow.db`), migrations, idempotent seeding of 25 records
  - **Api**: Route group endpoints under `/api/registrations`, Scalar API documentation (`/scalar/v1`), CORS policy for React dev server (`http://localhost:5173`)
- **Frontend (`frontend/`)**:
  - React 19 + Vite + Tailwind CSS
  - KPI summary metric cards, registrations table with live filters (search, type, status), pagination, and real-time backend integration

---

## How to Run the Applications

### 1. Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/)
- [Node.js 18+](https://nodejs.org/)

### 2. Running the Backend API
```bash
cd backend
dotnet restore
dotnet run --project Api
```
- API Base URL: `http://localhost:5205`
- Scalar Interactive Docs: `http://localhost:5205/scalar/v1`
- OpenAPI Specification: `http://localhost:5205/openapi/v1.json`

### 3. Running the Frontend App
```bash
cd frontend
npm install
npm run dev
```
- Frontend Dev URL: `http://localhost:5173`
