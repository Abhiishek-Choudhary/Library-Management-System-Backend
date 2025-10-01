📚 Library Management Backend

A backend API for a Library Management System built with Node.js, Express, MongoDB, and Cloudinary.
Deployed as serverless functions on Vercel
.

🚀 Features

🔐 Authentication & Authorization (User login & registration)

📚 Book Management (Add, update, delete, list books)

🛒 Cart Management (Borrowing/holding books)

📑 Issue & Return System

☁️ Cloudinary Integration for media uploads (e.g., book covers)

🛡️ Security with Helmet, CORS, Rate Limiting & Error Handling

📊 Request Logging with Morgan

🌍 Serverless Deployment (Vercel-ready)

🏗️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Cloud Storage: Cloudinary

Deployment: Vercel (Serverless Functions)

Security: Helmet, CORS, Rate Limiting

📂 Folder Structure
library-backend/
├─ api/
│  └─ index.js            # Vercel entry (serverless handler)
├─ app.js                 # Express app
├─ config/
│  └─ db.js               # MongoDB connection
├─ middlewares/
│  └─ error.middleware.js # Global error handler
├─ routes/
│  ├─ auth.routes.js
│  ├─ book.routes.js
│  ├─ cart.routes.js
│  └─ issue.routes.js
├─ utils/
│  └─ cloudinary.js       # Cloudinary config
├─ vercel.json            # Vercel configuration
├─ package.json
└─ .env

⚙️ Installation & Setup
1️⃣ Clone the repo
git clone https://github.com/your-username/library-backend.git
cd library-backend

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables

Create a .env file (not committed) with:

MONGO_URI=your_mongo_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

4️⃣ Run locally
npm start


Server runs at:

http://localhost:5000

🚀 Deployment on Vercel

Push your repo to GitHub.

Import into Vercel
.

Add Environment Variables (MongoDB & Cloudinary credentials).

Deploy 🎉

Your API will be available at:

https://your-app-name.vercel.app/api/auth/register
https://your-app-name.vercel.app/api/books

📌 API Endpoints
🔐 Auth

POST /api/auth/register → Register new user

POST /api/auth/login → Login user

📚 Books

GET /api/books → Get all books

POST /api/books → Add new book

PUT /api/books/:id → Update book

DELETE /api/books/:id → Delete book

🛒 Cart

GET /api/cart → Get user cart

POST /api/cart → Add to cart

DELETE /api/cart/:id → Remove from cart

📑 Issue

POST /api/issue/checkout → Issue a book

POST /api/issue/return → Return a book  


🔒 Security

Helmet → Sets secure HTTP headers

CORS → Restricts resource sharing

Rate Limiter → Limits requests to prevent abuse

Error Handler → Centralized error responses
