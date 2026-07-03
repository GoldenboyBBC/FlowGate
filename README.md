# Authentication Service

This repository contains the authentication service for a test platform, built with Spring Boot, Spring Security, and JWT for secure user management. It provides robust user registration and login functionalities.

## Features

*   **User Registration:** Securely register new users with hashed passwords.
*   **User Login:** Authenticate users and issue JSON Web Tokens (JWT) for secure session management.
*   **JWT-based Authentication:** Protect API endpoints using JWTs.
*   **CORS Configuration:** Properly configured Cross-Origin Resource Sharing for seamless frontend-backend integration.
*   **Frontend (React):** A simple React application demonstrating user registration and login.

## Technologies Used

### Backend
*   **Java 26:** Programming Language
*   **Spring Boot 4.1.0:** Framework for building standalone, production-grade Spring-based applications.
*   **Spring Security:** Provides authentication, authorization, and protection against common attacks.
*   **JJWT:** Java JWT (JSON Web Token) library for creating and consuming JWTs.
*   **Spring Data JPA:** Simplifies data access with Java Persistence API.
*   **PostgreSQL:** Relational database for storing user information.
*   **Maven:** Build automation tool.

### Frontend
*   **React:** JavaScript library for building user interfaces.
*   **TypeScript:** Typed superset of JavaScript.
*   **Vite:** Fast frontend build tool.
*   **CSS:** For styling.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Java Development Kit (JDK) 26**
*   **Maven 3.x**
*   **Node.js (LTS)**
*   **npm (comes with Node.js)**
*   **PostgreSQL database server** (Ensure it's running and accessible)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flowgate-auth.git
cd flowgate-auth
```

#### 2. Backend Setup

Navigate to the root directory of the backend service (`flowgate-auth/`):

```bash
cd flowgate-auth
```

Configure your PostgreSQL database:
*   Ensure your PostgreSQL server is running.
*   Create a database named `auth_db`.
*   Update `src/main/resources/application.properties` with your PostgreSQL username and password if they differ from `auth_user` and `1234`.

Build and run the Spring Boot application:

```bash
./mvnw clean install
./mvnw spring-boot:run
```
The backend server will start on `http://localhost:8080`.

#### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd auth-frontend
```

Install the dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```
The frontend application will typically open in your browser at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

Once both the backend and frontend are running:

1.  **Register:** On the frontend application, navigate to the "Register here" link and create a new account by providing a username and password.
2.  **Login:** After successful registration (or if you already have an account), use your credentials to log in. Upon successful login, a JWT will be stored in your browser's local storage, and the UI will update to show a "Welcome" message.
3.  **Logout:** Click the "Logout" button to clear your session and remove the JWT from local storage.
