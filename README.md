# Backend API - User Profile Management

This is a Node.js/Express backend API that provides endpoints for managing user profiles.

## Features

- Get user profile by ID
- Update user profile information
- Create new user profiles
- Get all profiles
- Email validation
- CORS support for frontend integration

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Server

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

For development with auto-reload, run:
```bash
npm run dev
```

## API Endpoints

### Health Check
```
GET /health
```
Returns server status.

### Get Profile by ID
```
GET /api/profile/:id
```
Returns a user profile by ID.

**Response:**
```json
{
  "id": "1",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "bio": "Software developer passionate about building great products.",
  "avatar": null,
  "createdAt": "2025-10-27T08:30:00.000Z",
  "updatedAt": "2025-10-27T08:30:00.000Z"
}
```

### Get All Profiles
```
GET /api/profile
```
Returns all user profiles.

### Update Profile
```
PUT /api/profile/:id
```
Updates a user profile.

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "bio": "Updated bio text",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Create Profile
```
POST /api/profile
```
Creates a new user profile.

**Request Body:**
```json
{
  "firstName": "New",
  "lastName": "User",
  "email": "newuser@example.com",
  "bio": "My bio",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Note:** Email is required for profile creation.

## Testing

Run tests:
```bash
npm test
```

## Project Structure

```
.
├── index.js              # Main server file
├── models/
│   └── userProfile.js    # User profile data model
├── routes/
│   └── profile.js        # Profile API routes
├── tests/
│   └── test.js           # API tests
├── package.json          # Project dependencies
└── README.md             # Documentation
```

## Data Model

The user profile includes:
- `id`: Unique identifier
- `firstName`: User's first name
- `lastName`: User's last name
- `email`: User's email address (validated)
- `bio`: User biography/description
- `avatar`: Profile picture URL
- `createdAt`: Profile creation timestamp
- `updatedAt`: Last update timestamp

## Notes

- This implementation uses in-memory storage for demonstration purposes
- In production, integrate with a proper database (MongoDB, PostgreSQL, etc.)
- Add authentication/authorization as needed
- The API includes CORS support for frontend integration
