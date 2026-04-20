# Backend Boilerplate with MongoDB and Mongoose

This is a Node.js backend boilerplate using Express.js, MongoDB with Mongoose, TypeScript, and more.

## Features

- Authentication (JWT, Google OAuth)
- User management
- Host management
- File uploads (Cloudinary)
- Email sending
- Rate limiting
- Redis caching
- Zod validation
- Error handling

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in the values
4. Set up MongoDB and update `MONGODB_URI` in `.env`
5. Run the development server: `npm run dev`
6. Seed the super admin: `npm run seed`

## Environment Variables

- `NODE_ENV`: development/production
- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `JWT_ACCESS_SECRET`: JWT access token secret
- `JWT_REFRESH_SECRET`: JWT refresh token secret
- `JWT_ACCESS_EXPIRES_IN`: Access token expiration
- `JWT_REFRESH_EXPIRES_IN`: Refresh token expiration
- `RESET_PASS_SECRET`: Reset password secret
- `RESET_PASS_EXPIRES_IN`: Reset password expiration
- `BCRYPT_SALT_ROUNDS`: Bcrypt salt rounds
- `SUPER_ADMIN_EMAIL`: Super admin email
- `SUPER_ADMIN_PASSWORD`: Super admin password
- `CLIENT_URL`: Frontend URL
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port
- `REDIS_USERNAME`: Redis username
- `REDIS_PASSWORD`: Redis password
- `SMTP_HOST`: SMTP host
- `SMTP_PORT`: SMTP port
- `SMTP_USER`: SMTP user
- `SMTP_PASS`: SMTP password
- `SMTP_FROM`: SMTP from
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GOOGLE_CALLBACK_URL`: Google OAuth callback URL
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run seed`: Seed super admin

## API Endpoints

### Auth
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/refresh
- POST /api/v1/auth/forgot-password
- POST /api/v1/auth/verify-otp
- POST /api/v1/auth/reset-password
- POST /api/v1/auth/change-password
- GET /api/v1/auth/google

### User
- GET /api/v1/users/profile
- PUT /api/v1/users/profile
- DELETE /api/v1/users/account
- GET /api/v1/users (admin)
- GET /api/v1/users/:id (admin)
- PUT /api/v1/users/:id/status (admin)
- PUT /api/v1/users/:id/role (admin)
- DELETE /api/v1/users/:id (admin)

### Host
- POST /api/v1/hosts/apply
- GET /api/v1/hosts/profile
- PUT /api/v1/hosts/profile
- GET /api/v1/hosts (admin)
- GET /api/v1/hosts/:id (admin)
- PUT /api/v1/hosts/:id/approve (admin)