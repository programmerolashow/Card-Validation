# Card Number Validation API

A robust, production-ready REST API built to validate card numbers using the Luhn Algorithm. This project was developed as part of a Backend Developer Assessment, demonstrating clean architecture, strict typing, and comprehensive error handling.

## 🚀 Technologies Used
- **Node.js & Express.js**
- **TypeScript** (Strict mode enabled)
- **Jest** (Unit testing)
- **Cors & Dotenv** (Security and environment configuration)

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/programmerolashow/Card-Validation.git
cd Card-Validation
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory to configure the environment:
```env
PORT=3000
NODE_ENV=development
```

### 4. Run the Application
**Development Mode (Auto-reloading):**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm start
```

### 5. Run Unit Tests
```bash
npm test
```

---

## 📡 API Documentation

### Validate Card
Determines whether a given card number mathematically passes the Luhn Algorithm.

**Endpoint:** `POST /api/validate-card`

**Request Body:**
```json
{
  "cardNumber": "4532015112830366"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "cardNumber": "4532015112830366",
    "isValid": true
  },
  "message": "Valid card number"
}
```

**Error Response (400 Bad Request):**
*Returned when input is missing, malformed, or contains non-numeric characters.*
```json
{
  "success": false,
  "message": "cardNumber must contain only digits"
}
```

---

## 🏗️ Architectural Decisions & Highlights

### 1. Separation of Concerns (MVC Pattern)
The application is strictly separated into logical layers to maintain readability and scalability:
- **Routes (`src/routes/`)**: Maps HTTP endpoints to controller functions.
- **Controllers (`src/controllers/`)**: Handles request validation, sanitization, and formats HTTP responses.
- **Services (`src/services/`)**: Contains the core business logic, acting as a bridge to utilities.
- **Utilities (`src/utils/`)**: Houses pure, isolated mathematical functions (like the Luhn Algorithm) making them incredibly easy to unit test.

### 2. Robust Error Handling & Middleware
- **Global Error Handler (`src/middlewares/error.middleware.ts`)**: A centralized middleware catches unexpected application errors and returns a standardized `500 Internal Server Error` JSON response. Stack traces are safely hidden in production environments.
- **Request Logger (`src/middlewares/logger.middleware.ts`)**: A custom middleware tracks incoming requests (method, path, timestamp) for easier debugging and traffic monitoring.

### 3. Graceful Input Validation
The endpoint handles unexpected and malformed input early in the request cycle, saving computational resources:
- Rejects missing or non-string payloads.
- Trims trailing/leading spaces automatically.
- Uses strict **Regex Validation** (`/^\d+$/`) to instantly reject payloads containing letters or special characters *before* they reach the mathematical processing loop.

### 4. Strict Type Safety
The project is configured with `strict: true` in `tsconfig.json`. This prevents implicit `any` types and forces safe indexed data access. For example, using `.charAt(i)` instead of bracket notation `[i]` on strings prevents `undefined` type leakage during string parsing.