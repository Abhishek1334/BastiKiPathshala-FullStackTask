# 🏛️ NGO Internship Application

Live Site : https://bastikipathshala-nine.vercel.app/

A web application for managing internship applications for an NGO called "Basti Ki Pathshala Foundation".

## 📋 Features

-   **Home Page**: Landing page with information about the NGO
-   **Application Form**: Form for students to apply for internships
-   **Admin Panel**: Admin can view all applications and manage them
-   **Authentication**: Secure admin login system

## 🛠️ Tech Stack

### Frontend

-   React.js
-   React Router for navigation
-   Tailwind CSS for styling
-   Lucide React for icons

### Backend

-   Node.js
-   Express.js
-   MongoDB with Mongoose
-   JWT for authentication
-   Cookie-based sessions

## 🚀 How to Run

### Prerequisites

-   Node.js (version 14 or higher)
-   MongoDB Atlas account

### Setup Instructions

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd NGO
    ```

2. **Install dependencies**

    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. **Environment Variables**

    Create `.env` file in backend folder:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    ADMIN_PASSWORD=admin123
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRES_IN=24h
    COOKIE_SECRET=your_cookie_secret
    PORT=5000
    ```

4. **Start the servers**

    **Backend:**

    ```bash
    cd backend
    npm start
    ```

    **Frontend:**

    ```bash
    cd frontend
    npm run dev
    ```

5. **Access the application**
    - Frontend: http://localhost:5173
    - Backend: http://localhost:5000

## 📁 Project Structure

```
NGO/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── Applicant.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── applicants.js
│   ├── utils/
│   │   └── validation.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🔐 Admin Access

-   **URL**: http://localhost:5173/admin
-   **Password**: admin123

## 🧪 Testing the Application

1. **Test Home Page**

    - Visit http://localhost:5173
    - Check if all sections load properly
    - Test navigation links

2. **Test Application Form**

    - Go to Register page
    - Fill out the form with test data
    - Submit and check if data is saved

3. **Test Admin Panel**
    - Login with admin credentials
    - View submitted applications
    - Test logout functionality


## 📝 API Endpoints

### Authentication

-   `POST /api/auth/login` - Admin login
-   `POST /api/auth/logout` - Admin logout
-   `GET /api/auth/verify` - Verify authentication

### Applications

-   `POST /api/applicants` - Submit new application
-   `GET /api/applicants` - Get all applications (admin only)

---
