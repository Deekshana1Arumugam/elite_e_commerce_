# E-commerce API

This project is a backend API for an e-commerce platform built using Node.js and Sequelize, with a MySQL database. The API supports multiple user roles (admin, staff, vendor, and user) with specific permissions for each role.

## Features

- **Role-based Authentication and Authorization**:
  - Users can sign up and log in.
  - Admins can create staff and manage vendors.
  - Vendors can manage their own products.
  - Users can view products.
- **Product Management**:
  - Admins, staff, and vendors can create, view, and manage products.
  - Products include details such as name, category, price, discount, delivery information, and unique URLs.
- **Dynamic Calculations**:
  - Products automatically calculate expiry dates and discount percentages without storing them in the database.
- **Server-side Pagination**:
  - Search and list products efficiently using pagination.

## Project Structure

```
ecommerce-api/
├── config/
│   └── database.js        # Database connection
├── controllers/
│   ├── authController.js  # Handles authentication logic
│   ├── productController.js # Handles product-related logic
│   └── userController.js  # Handles user management logic
├── middleware/
│   └── authMiddleware.js  # Role-based access control
├── models/
│   ├── Product.js         # Product schema
│   ├── Role.js            # Role definitions (if needed for extension)
│   └── User.js            # User schema
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── productRoutes.js   # Product routes
│   └── userRoutes.js      # User routes
├── utils/
│   └── helpers.js         # Utility functions (e.g., formatting, reusable logic)
├── .env                   # Environment variables
├── server.js              # Entry point for the application
└── database.sql           # SQL file for schema
```

## Prerequisites

- Node.js (v16 or later)
- MySQL
- Postman (optional, for testing)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd elite_e_commerce_
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the root directory and add the following:

   ```env
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Import the database schema: Use the `dbSchema.sql` file to create the database and tables in MySQL.

   ```bash
   mysql -u <username> -p < database.sql
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. Test the API endpoints using Postman or similar tools.
  - Postman collection is can be found in 
## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - User signup (for buyers and vendors).
- **POST** `/api/auth/login` - User login.

### Product Management

- **POST** `/api/products` - Create a new product (admin, staff, vendor).
- **GET** `/api/products` - List all products (paginated).

### User Management

- **GET** `/api/users` - Admin-only: List all users.

### NOTE
- PFA Postman collection elite_e_commerce_postman_collection in the root of project.

