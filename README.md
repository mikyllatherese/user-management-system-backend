# user-management-system-backend

User Management System

Introduction

A full-stack User Management System built with Node.js, Express, Sequelize, and MySQL for the backend. This project includes robust features like:

    User registration with email verification

    JWT authentication and refresh token support

    Role-based authorization (Admin, User, etc.)

    Forgot and reset password functionality

    CRUD operations for managing user accounts

    Installation



1. Clone the repository
    git clone https://github.com/mikyllatherese/user-management-system-backend.git
    cd user-management-system-backend

2. Install backend dependencies
    npm install

3. Configure environment variables
Create a .env file or update config.js with your environment settings:
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=Raffff
    DB_PASSWORD=rcaballero1
    DB_NAME=node-mysql-signup-verification-api
    SMTP_HOST=smtp.ethereal.email
    SMTP_PORT=587
    SMTP_USER=kevin.klein73@ethereal.email
    SMTP_PASS=DURYMx1bbUfVaeJmJ2

4. Start the backend server
    npm start

5. Start Angular frontend (if included)
Navigate to your Angular app directory and run:
    ng serve



    Usage

 User Features

    Register at POST /accounts/register

    Verify Email via the link sent to your inbox

    Login at POST /accounts/authenticate

    Forgot Password at POST /accounts/forgot-password

    Reset Password at POST /accounts/reset-password

 Role-based Authorization

    Regular users can update their profiles

    Admins can:

    View all accounts

    Update/delete users

Routes are protected using JWT + Role-based guards.



    Testing

 Functional Testing

    All core user flows tested manually:

    Registration, login, email verification

    Password reset

    Role-based access

 Security Testing

    Passwords are hashed with bcrypt

    JWT is signed and securely stored

    Email links expire and tokens are validated

    Test results and manual QA notes can be linked here if available.



Contributing

Git Workflow
1. Fork the repository
    
2. Create a feature branch:
    git checkout -b user-management-system-backend

3. Make changes and commit:
    git commit -m "Add: new feature"

4. Push and open a pull request:
    git push origin user-management-system-backend



Best Practices

    Commit often with clear messages

    Use descriptive branch names

    Review code before merging

    Keep branches updated with main

    Use GitHub Issues to track bugs and features



License

    This project is licensed under the MIT License.



Deliverables

 Fully functional Node.js backend:

    Email sign-up and verification

    JWT authentication + refresh tokens

    Role-based access control

    Forgot/reset password

    Account CRUD
 Ready-to-integrate Angular frontend (optional for this repo)

 Well-maintained GitHub repo with clean structure and PR history

 Comprehensive README documentation

 Test logs or feedback from testers