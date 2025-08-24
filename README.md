# 🚀 Todo App - Full Stack Application

A modern, full-stack Todo application built with React, Node.js, Express, and MongoDB. Features OTP-based authentication, beautiful email notifications, and a responsive Material-UI interface.

## ✨ Features

### 🔐 Authentication
- **OTP-based Login System** - Secure authentication without passwords
- **JWT Token Management** - Stateless authentication with cookies
- **User Registration & Login** - Simple user management
- **Auto-logout** - Automatic session management

### 📧 Email System
- **Beautiful OTP Emails** - Professionally styled verification emails
- **HTML Email Templates** - Responsive design that works across all email clients
- **Gmail Integration** - Uses Gmail SMTP for reliable delivery
- **5-minute OTP Expiry** - Enhanced security

### 📝 Todo Management
- **Create, Read, Update, Delete** - Full CRUD operations
- **Checkbox Toggle** - Mark todos as complete/incomplete
- **Real-time Updates** - Instant UI updates
- **User-specific Todos** - Secure data isolation

### 🎨 User Interface
- **Material-UI Design** - Modern, responsive interface
- **Custom Logo & Branding** - Professional app identity
- **Mobile Responsive** - Works on all device sizes
- **Dark Theme** - Easy on the eyes

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Material-UI (MUI)** - Professional UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Nodemailer** - Email functionality
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Auto-restart server
- **dotenv** - Environment variables
- **ESLint** - Code quality

## 📁 Project Structure

```
todo-project/
├── api/                          # Backend API
│   ├── config/
│   │   └── db.js               # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── todoController.js    # Todo CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification
│   ├── models/
│   │   ├── Todo.js             # Todo data model
│   │   └── User.js             # User data model
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication endpoints
│   │   ├── todoRoutes.js       # Todo endpoints
│   │   └── testRoutes.js       # Testing endpoints
│   ├── public/
│   │   └── test-email.html     # Email testing interface
│   ├── server.js               # Express server
│   └── testEmail.js            # Email testing script
├── web/                         # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.js     # Todo creation form
│   │   │   └── TodoList.js     # Todo display list
│   │   ├── context/
│   │   │   └── AuthContext.js  # Authentication state
│   │   ├── pages/
│   │   │   ├── Login.js        # OTP login page
│   │   │   ├── Register.js     # User registration
│   │   │   └── Todo.js         # Main todos page
│   │   ├── api.js              # API functions
│   │   ├── App.js              # Main app component
│   │   └── index.js            # App entry point
│   └── public/
│       ├── index.html          # HTML template
│       └── favicon.svg         # Custom favicon
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **Gmail account** (for OTP emails)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/todo-project.git
cd todo-project
```

### 2. Backend Setup
```bash
cd api
npm install
```

Create a `.env` file in the `api` folder:
```env
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-super-secret-jwt-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Frontend Setup
```bash
cd ../web
npm install
```

### 4. Start the Application

#### Terminal 1 - Backend
```bash
cd api
npm run dev
```
Server will start on `http://localhost:5000`

#### Terminal 2 - Frontend
```bash
cd web
npm start
```
App will open on `http://localhost:3000`

## 📧 Email Configuration

### Gmail App Password Setup
1. Enable 2-factor authentication on your Gmail
2. Generate an App Password
3. Use the App Password in your `.env` file

### Test Email System
- **Web Interface**: `http://localhost:5000/test-email.html`
- **API Endpoint**: `POST /api/test/test-email`
- **NPM Script**: `npm run test-email`

## 🔧 Available Scripts

### Backend (api folder)
```bash
npm run dev          # Start development server
npm start            # Start production server
npm run test-email   # Test email functionality
```

### Frontend (web folder)
```bash
npm start            # Start development server
npm build            # Build for production
npm test             # Run tests
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/request-otp` - Request OTP
- `POST /api/auth/verify-otp` - Verify OTP
- `GET /api/auth/me` - Get user profile
- `POST /api/auth/logout` - User logout

### Todos
- `GET /api/todos` - Get user todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Toggle todo completion
- `DELETE /api/todos/:id` - Delete todo

### Testing
- `POST /api/test/test-email` - Test email system
- `POST /api/test/test-otp` - Test OTP system

## 🎯 Key Features Explained

### OTP Authentication Flow
1. User enters email address
2. System generates 6-digit OTP
3. Beautiful HTML email sent with OTP
4. User enters OTP for verification
5. JWT token issued upon successful verification
6. User redirected to todos page

### Email Styling
- **Table-based layout** for maximum email client compatibility
- **Inline CSS** for consistent rendering
- **Responsive design** that works on mobile
- **Professional branding** with your app colors

### Security Features
- **JWT tokens** stored in HTTP-only cookies
- **OTP expiration** after 5 minutes
- **Password hashing** with bcrypt
- **CORS protection** for API security

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Build and deploy to services like:
   - **Heroku**
   - **Railway**
   - **Render**
   - **DigitalOcean**

### Frontend Deployment
1. Build the app: `npm run build`
2. Deploy to services like:
   - **Vercel**
   - **Netlify**
   - **GitHub Pages**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI** for beautiful components
- **Nodemailer** for email functionality
- **MongoDB** for database
- **Express.js** community for excellent documentation

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

---

**Made with ❤️ by [pavan chinchalpet]**

⭐ **Star this repository if you found it helpful!**
