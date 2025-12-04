# Car Hunt Backend API

Backend server for Car Hunt application with MongoDB integration.

## Setup Instructions

1. **Install Dependencies**

   ```bash
   cd back_end
   npm install
   ```

2. **Configure Environment Variables**

   Create a `.env` file in the `back_end` directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/car_hunt
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car_hunt?retryWrites=true&w=majority

   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   PORT=5000
   ```

3. **Start MongoDB**

   Make sure MongoDB is running on your system. If using MongoDB Atlas, use the connection string in `.env`.

4. **Create Admin User**

   ```bash
   # Create the first admin user
   npm run create-admin
   ```

   Default admin credentials:

   - Email: `admin@carhunt.com`
   - Password: `admin123`

   ⚠️ **Important**: Change the admin password after first login!

5. **Run the Server**

   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "password": "password123"
  }
  ```

- **POST** `/api/auth/login` - Login user

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **GET** `/api/auth/me` - Get current logged in user (requires authentication)
  - Headers: `Authorization: Bearer <token>`

### Sell Requests (Admin Only)

- **GET** `/api/sell` - Get all sell requests (requires admin role)
- **GET** `/api/sell/:id` - Get a single sell request (requires admin role)
- **PATCH** `/api/sell/:id/approve` - Approve a sell request (requires admin role)
- **PATCH** `/api/sell/:id/reject` - Reject a sell request (requires admin role)

All admin endpoints require:

- Headers: `Authorization: Bearer <token>`
- User must have `role: "admin"` in database

## Frontend Configuration

In `front_end/.env` or `front_end/.env.local`, add:

```
VITE_API_URL=http://localhost:5000/api
```
