# RXTX Clubhouse

![showcase](./showcase.png)

An exclusive clubhouse app where users can create posts and interact based on roles.

This project was built for The Odin Project "Members Only" assignment using Node.js, Express, PostgreSQL, Passport.js, and EJS.

## Overview

The app supports three user levels:

- Guest: can view posts, but sees anonymous authors and no dates.
- Member: can see author names and post timestamps.
- Admin: can do everything a member can, plus delete posts.

Users sign up with email and password, then can join membership and admin roles through secret codes.

## Features

- User authentication with Passport Local Strategy
- Secure password hashing with bcrypt
- Session-based login with session persistence in PostgreSQL (`connect-pg-simple`)
- Server-side validation and sanitization using `express-validator`
- Membership upgrade using a secret code
- Admin upgrade using a secret code
- Role-based authorization middleware (`isAuth`, `isMember`, `isAdmin`)
- Post creation for authenticated users
- Role-based post metadata visibility:
  - Guests: anonymous author, hidden date
  - Members/Admins: real author name and date
- Admin-only post deletion
- Error handling and not-permitted/404 pages

## Tech Stack

- Runtime: Node.js
- Framework: Express
- Templating: EJS
- Database: PostgreSQL
- Authentication: Passport.js (`passport-local`)
- Validation: `express-validator`
- Password hashing: `bcryptjs`
- Session storage: `express-session` + `connect-pg-simple`

## Project Structure

```text
.
|-- app.js
|-- config/
|   `-- passport.js
|-- controllers/
|   |-- admin.controller.js
|   |-- auth.controller.js
|   |-- home.controller.js
|   |-- membership.controller.js
|   `-- post.controller.js
|-- db/
|   |-- pool.js
|   |-- queries.js
|   `-- schema.sql
|-- middleware/
|   |-- auth.middleware.js
|   |-- error.middleware.js
|   `-- user.middleware.js
|-- public/
|   `-- styles.css
|-- routes/
|   |-- admin.router.js
|   |-- auth.router.js
|   |-- home.router.js
|   |-- membership.router.js
|   `-- post.router.js
`-- views/
    |-- index.ejs
    |-- sign-up.ejs
    |-- log-in.ejs
    |-- new-post.ejs
    |-- membership.ejs
    |-- become-admin.ejs
    `-- partials/
        |-- header.ejs
        `-- post.ejs
```

## Database Schema

Defined in `db/schema.sql`.

### users

- `id` (PK)
- `firstname` (varchar 100)
- `lastname` (varchar 100)
- `email` (varchar 255, unique)
- `password` (varchar 255, hashed)
- `is_member` (boolean, default false)
- `is_admin` (boolean, default false)

### posts

- `id` (PK)
- `title` (varchar 50)
- `body` (varchar 500)
- `created_at` (timestamptz, default current timestamp)
- `user_id` (FK -> users.id, cascade delete)

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
DB_URI=postgresql://<username>:<password>@<host>:<port>/<database>
SECRET=<session_secret>
MEMBER_CODE=<membership_secret_code>
ADMIN_CODE=<admin_secret_code>
```

You can start from `.env.example`.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up PostgreSQL

- Create a database.
- Run the schema file:

```bash
psql -d <database_name> -f db/schema.sql
```

### 3. Configure environment variables

- Copy `.env.example` to `.env`.
- Fill all required values.

### 4. Run the app

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

App runs at `http://localhost:<PORT>`.

## Authentication and Authorization Flow

1. User signs up (`/auth/sign-up`) with validated fields and hashed password.
2. User logs in (`/auth/log-in`) using Passport Local Strategy.
3. Logged-in user can create posts (`/post/new`).
4. User can become a member (`/membership/code`) by entering `MEMBER_CODE`.
5. Member can become admin (`/admin/code`) by entering `ADMIN_CODE`.
6. Admin can delete posts (`/post/delete/:id`).

## Route Reference

### Public

- `GET /` - Home page with all posts
- `GET /auth/sign-up` - Sign-up page
- `POST /auth/sign-up` - Create user
- `GET /auth/log-in` - Login page
- `POST /auth/log-in` - Authenticate user

### Authenticated (`isAuth`)

- `GET /auth/log-out` - Logout
- `GET /post/new` - New post page
- `POST /post/new` - Create post
- `GET /membership/code` - Membership code page
- `POST /membership/code` - Submit membership code

### Member-gated (`isAuth + isMember`)

- `GET /admin/code` - Admin code page
- `POST /admin/code` - Submit admin code

### Admin-gated (inside controller via `isAdmin`)

- `GET /post/delete/:id` - Delete post

## Input Validation Rules

### Sign-up

- First name: required, max 100 chars
- Last name: required, max 100 chars
- Email: required, valid email, max 255 chars, unique
- Password: required, max 255 chars
- Confirm password: must match password

### New Post

- Title: required, 10-50 chars
- Body: required, 25-500 chars

## Security Notes

- Passwords are never stored in plain text; they are hashed with bcrypt.
- Authorization checks exist both in route middleware and controller logic.
- Session data is stored in PostgreSQL for persistence.
- Secret codes are read from environment variables.

## License

MIT (see `LICENSE`).
