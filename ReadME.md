# Fashion Cave

> A modern, full-stack e-commerce platform tailored for fashion retail, featuring a dynamic storefront, a dedicated admin dashboard, and a robust backend API.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)

## 📖 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)

---

## 🔍 Overview
**Fashion Cave** is a premier online fashion destination designed to make the latest trends accessible to everyone. We curate a diverse collection of contemporary outfits and cutting-edge designs at competitive prices, all delivered through a seamless and intuitive digital shopping experience. Our mission is to bridge the gap between high-end style and everyday affordability, ensuring every user enjoys a smooth journey from discovery to checkout.

Built using the **MERN stack** (MongoDB, Express, React, Node.js), the platform distinguishes itself with a high-performance frontend utilizing advanced animations and a secure, scalable backend integrating payment gateways and email services.

The repository is organized into three main components:
1.  **Frontend**: The customer-facing shopping experience.
2.  **Admin**: A dashboard for store owners to manage products, orders, and users.
3.  **Backend**: The REST API server connecting the client applications to the database.

## ✨ Features

### Client Side (Frontend)
- **Immersive UI/UX**: Smooth scrolling and animations using `locomotive-scroll` and `gsap`.
- **Responsive Design**: Optimized for desktop and mobile viewing.
- **Product Catalog**: Infinite scroll capabilities for seamless browsing of the latest collections.
- **Shopping Cart**: Real-time state management for cart operations.

### Admin Dashboard
- **Product Management**: Interface to add, update, or remove inventory.
- **Dashboard Analytics**: Visual overview of store performance.
- **Secure Access**: Protected routes for administrators.

### Backend & Security
- **User Authentication**: Secure login/signup using `bcryptjs` and `jsonwebtoken` (JWT).
- **Payment Processing**: Integrated **Stripe** support for secure transactions.
- **Email Notifications**: Automated emails using `nodemailer`.
- **Image Handling**: Efficient file uploads via `multer`.

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT & Bcrypt
- **Payment**: Stripe API
- **Utilities**: Nodemailer, Dotenv, Validator

### Frontend & Admin
- **Library**: React.js
- **Routing**: React Router DOM
- **Styling & Animations**: GSAP, Lottie Web, Locomotive Scroll
- **State Management**: React Hooks / Context API

## 📂 Folder Structure

```bash
Fashion-Cave/
├── admin/          # React Admin Dashboard
├── backend/        # Express & Node.js API Server
├── frontend/       # React Storefront Application
└── README.md       # Project Documentation
```

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)

### Installation

Clone the repository:
```bash
git clone https://github.com/Devharsh01/Fashion-Cave.git
cd Fashion-Cave
```

You will need to install dependencies for each folder separately.

**1. Backend Setup**
```bash
cd backend
npm install
```

**2. Frontend Setup**
```bash
cd ../frontend
npm install
```

**3. Admin Setup**
```bash
cd ../admin
npm install
```

### Environment Variables

You need to configure environment variables for the backend to function correctly. Create a `.env` file in the `backend/` directory:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

## ⚡ Running the Project

To run the application, you need to start the backend server and the frontend development servers concurrently (in separate terminal windows).

**Start Backend Server:**
```bash
cd backend
npm run start
# or for development with nodemon:
npx nodemon index.js
```

**Start Frontend Application:**
```bash
cd frontend
npm start
```

**Start Admin Dashboard:**
```bash
cd admin
npm start
```

- The **API** will typically run on `http://localhost:4000` (or your defined PORT).
- The **Frontend** will launch at `http://localhost:3000`.
- The **Admin** panel will launch at `http://localhost:3001` (React will prompt to use a different port if 3000 is busy).

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
