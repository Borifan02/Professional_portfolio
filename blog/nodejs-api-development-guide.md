# Node.js API Development: From Zero to Production

*By Borifan Dabasa | Full Stack Developer*

Building RESTful APIs with Node.js and Express has been a core part of my work as a MERN stack developer. After building APIs for e-commerce platforms, appointment systems, and crypto trackers, I've developed a solid workflow that I'm sharing today.

## Why Node.js for APIs?

When I started backend development, I chose Node.js because:
- **JavaScript everywhere** - Same language for frontend and backend
- **Fast and scalable** - Non-blocking I/O handles thousands of requests
- **Rich ecosystem** - npm has packages for everything
- **Easy deployment** - Vercel, Heroku, AWS all support it

## Project Setup

Here's how I start every API project:

```bash
mkdir my-api && cd my-api
npm init -y
npm install express mongoose dotenv cors
npm install -D nodemon
```

My `package.json` scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## Folder Structure

```
my-api/
├── config/
│   └── db.js           # Database connection
├── models/             # Mongoose models
├── routes/             # API routes
├── controllers/        # Business logic
├── middleware/         # Custom middleware
├── utils/              # Helper functions
├── .env                # Environment variables
└── server.js           # Entry point
```

## 1. Setting Up Express Server

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## 2. Database Connection

```javascript
// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## 3. Creating Models

```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

## 4. Controllers Pattern

I separate business logic from routes:

```javascript
// controllers/userController.js
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create user
// @route   POST /api/users
// @access  Public
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }
    
    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
```

## 5. Routes

```javascript
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

router.route('/')
  .get(getUsers)
  .post(createUser);

module.exports = router;
```

## 6. Authentication with JWT

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

// Generate token
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};
```

## 7. Input Validation

```javascript
// middleware/validation.js
exports.validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      message: 'Please provide all required fields' 
    });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ 
      message: 'Password must be at least 6 characters' 
    });
  }
  
  next();
};
```

## 8. Error Handling

```javascript
// middleware/errorHandler.js
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = { ErrorResponse, errorHandler };
```

## 9. Environment Variables

```bash
# .env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your_jwt_secret_here
```

## 10. Real-World Example: E-Commerce API

In my e-commerce project, I built:

**Product Routes:**
```javascript
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
POST   /api/products          # Create product (admin)
PUT    /api/products/:id      # Update product (admin)
DELETE /api/products/:id      # Delete product (admin)
```

**Order Routes:**
```javascript
POST   /api/orders            # Create order
GET    /api/orders/myorders   # Get user orders
GET    /api/orders/:id        # Get order by ID
```

## Best Practices I Follow

1. **Use async/await** - Cleaner than callbacks
2. **Validate input** - Never trust user data
3. **Hash passwords** - Use bcrypt
4. **Rate limiting** - Prevent abuse
5. **CORS properly** - Whitelist domains
6. **Log errors** - Use Winston or Morgan
7. **API versioning** - `/api/v1/users`
8. **Documentation** - Use Swagger/Postman

## Testing Your API

```javascript
// Using Postman or curl
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Borifan","email":"test@example.com","password":"123456"}'
```

## Deployment

I deploy my APIs on:
- **Vercel** - Serverless functions
- **Heroku** - Traditional hosting
- **Railway** - Modern alternative

```bash
# Deploy to Vercel
npm i -g vercel
vercel
```

## Performance Tips

1. **Use indexes** in MongoDB
2. **Implement caching** with Redis
3. **Compress responses** with compression middleware
4. **Use pagination** for large datasets
5. **Optimize queries** - Select only needed fields

## What I'm Learning Next

- GraphQL APIs
- WebSocket for real-time features
- Microservices architecture
- Docker containerization

## Resources

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- My API projects: [GitHub](https://github.com/Borifan02)

---

**Questions?** Reach out at dabasaborifan@gmail.com

**Connect:**
- GitHub: [@Borifan02](https://github.com/Borifan02)
- LinkedIn: [Borifan Dabasa](http://www.linkedin.com/in/borifan-dabasa-a5191036b)

#NodeJS #ExpressJS #MongoDB #API #Backend #MERN
