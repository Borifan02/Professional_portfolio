// Dynamic Blog Data & LocalStorage Store for Borifan Dabasa's Portfolio

export const STORAGE_KEY_POSTS = 'borifan_portfolio_dynamic_blogs_v2';
export const STORAGE_KEY_LIKES = 'borifan_portfolio_blog_likes_v2';
export const STORAGE_KEY_BOOKMARKS = 'borifan_portfolio_blog_bookmarks_v2';
export const STORAGE_KEY_COMMENTS = 'borifan_portfolio_blog_comments_v2';

export const INITIAL_BLOG_POSTS = [
  {
    id: 'building-scalable-react-applications',
    slug: 'building-scalable-react-applications',
    title: 'Building Scalable React Applications: Lessons from Real Projects',
    subtitle: 'Architecture patterns, folder structures, and state strategies from production MERN development',
    category: 'Architecture',
    icon: 'bxl-react',
    author: {
      name: 'Borifan Dabasa',
      role: 'Full Stack Software Engineer',
      avatar: 'image/me.png',
    },
    date: 'January 2025',
    readTime: '6 min read',
    tags: ['React', 'Architecture', 'State Management', 'Performance'],
    summary:
      'Best practices for structuring modern React applications: component modularity, state decoupling, memoization strategies, and production performance optimization.',
    content: `# Building Scalable React Applications: Lessons from Real Projects

*By Borifan Dabasa | Full Stack Developer*

As a MERN stack developer who's built multiple production applications, I've learned that writing React code is easy—writing scalable React code is an art. Today, I'm sharing the architecture patterns and best practices I use in every project.

## The Problem with "Just Start Coding"

When I built my first React app, I threw everything into components without thinking about structure. Fast forward three months, and I was drowning in prop drilling, duplicate logic, and components that did way too much.

Sound familiar?

## 1. Folder Structure That Scales

Here's the structure I use for all my React projects now:

\`\`\`
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── hooks/               # Custom hooks
├── context/             # Context providers
├── services/            # API calls
├── utils/               # Helper functions
├── constants/           # Constants and configs
└── pages/               # Page components
\`\`\`

**Why this works:** Each folder has a single responsibility. When I need to find something, I know exactly where to look.

## 2. Component Composition Over Complexity

I learned this the hard way. Here's a component from my early days:

\`\`\`jsx
// ❌ Bad: God component doing everything
function UserDashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 200 lines of logic...
  
  return (
    <div>
      {/* 300 lines of JSX */}
    </div>
  );
}
\`\`\`

Now I break it down:

\`\`\`jsx
// ✅ Good: Composed components
function UserDashboard() {
  return (
    <DashboardLayout>
      <UserProfile />
      <UserStats />
      <UserPosts />
    </DashboardLayout>
  );
}
\`\`\`

**Rule of thumb:** If your component is over 150 lines, it's probably doing too much.

## 3. Custom Hooks for Logic Reuse

Custom hooks changed my life. Instead of copying logic between components, I extract it:

\`\`\`jsx
// hooks/useAuth.js
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    setLoading(false);
    return unsubscribe;
  }, []);

  return { user, loading };
}

// Now use it anywhere
function Profile() {
  const { user, loading } = useAuth();
  
  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}
\`\`\`

I use custom hooks for:
- API calls (\`useFetch\`, \`useApi\`)
- Form handling (\`useForm\`)
- Local storage (\`useLocalStorage\`)
- Debouncing (\`useDebounce\`)

## 4. State Management: Keep It Simple

I see developers reaching for Redux immediately. Here's my approach:

1. **Local state** for component-specific data
2. **Context** for app-wide data (theme, auth)
3. **Redux/Zustand** only when Context becomes messy

For my e-commerce project, I used Context for cart and auth. That's it. No Redux needed.

\`\`\`jsx
// context/CartContext.js
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
\`\`\`

## 5. Performance Optimization

Three techniques I use in every project:

### Code Splitting
\`\`\`jsx
// Lazy load heavy components
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
\`\`\`

### Memoization
\`\`\`jsx
// Prevent unnecessary re-renders
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* Heavy computation */}</div>;
});
\`\`\`

### Virtual Lists
For my crypto tracker with 1000+ coins, I use \`react-window\`:
\`\`\`jsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={coins.length}
  itemSize={50}
>
  {CoinRow}
</FixedSizeList>
\`\`\`

## 6. Error Boundaries

This saved me during production bugs:

\`\`\`jsx
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

// Wrap your app
<ErrorBoundary>
  <App />
</ErrorBoundary>
\`\`\`

## 7. Environment Variables

Never hardcode API URLs:

\`\`\`jsx
// .env
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_KEY=your_key_here

// Use in code
const API_URL = process.env.REACT_APP_API_URL;
\`\`\`

## Real-World Example: My Blog Project

In my Next.js blog (live at [borifan-blog.vercel.app](https://borifan-blog.vercel.app/)), I implemented:

- **File-based routing** for automatic code splitting
- **ISR (Incremental Static Regeneration)** for fast loads
- **TypeScript** for type safety
- **Tailwind CSS** for consistent styling

Result? Lighthouse score of 95+ and sub-second load times.

## Key Takeaways

1. **Structure matters** - Organize by feature, not file type
2. **Compose, don't complicate** - Small, focused components
3. **Extract logic** - Custom hooks are your friend
4. **Optimize smartly** - Measure before optimizing
5. **Plan for errors** - Error boundaries save production

## What's Next?

I'm currently exploring:
- Server Components in Next.js 14
- React Query for better data fetching
- Micro-frontends for large apps

Want to see these patterns in action? Check out my projects on [GitHub](https://github.com/Borifan02).

---

**Questions?** Drop a comment or reach out at dabasaborifan@gmail.com

**Connect with me:**
- GitHub: [@Borifan02](https://github.com/Borifan02)
- LinkedIn: [Borifan Dabasa](http://www.linkedin.com/in/borifan-dabasa-a5191036b)

#React #WebDevelopment #JavaScript #Frontend #MERN`,
    claps: 58,
    views: 890,
    isBuiltIn: true,
  },
  {
    id: 'nodejs-api-development-guide',
    slug: 'nodejs-api-development-guide',
    title: 'Node.js API Development: From Zero to Production',
    subtitle: 'End-to-end blueprint for architecting production-grade RESTful APIs with Express, JWT, and MongoDB',
    category: 'Backend',
    icon: 'bxl-nodejs',
    author: {
      name: 'Borifan Dabasa',
      role: 'Full Stack Software Engineer',
      avatar: 'image/me.png',
    },
    date: 'January 2025',
    readTime: '8 min read',
    tags: ['Node.js', 'Express', 'Security', 'REST', 'MongoDB'],
    summary:
      'A practical, end-to-end blueprint for architecting production-grade RESTful APIs with Express.js, MongoDB connection pooling, validation layers, and JWT authentication.',
    content: `# Node.js API Development: From Zero to Production

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

\`\`\`bash
mkdir my-api && cd my-api
npm init -y
npm install express mongoose dotenv cors
npm install -D nodemon
\`\`\`

My \`package.json\` scripts:
\`\`\`json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
\`\`\`

## Folder Structure

\`\`\`
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
\`\`\`

## 1. Setting Up Express Server

\`\`\`javascript
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
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
\`\`\`

## 2. Database Connection

\`\`\`javascript
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
\`\`\`

## 3. Creating Models

\`\`\`javascript
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
\`\`\`

## 4. Controllers Pattern

I separate business logic from routes:

\`\`\`javascript
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
\`\`\`

## 5. Routes

\`\`\`javascript
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

router.route('/')
  .get(getUsers)
  .post(createUser);

module.exports = router;
\`\`\`

## 6. Authentication with JWT

\`\`\`javascript
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
\`\`\`

## 7. Input Validation

\`\`\`javascript
// middleware/validation.js
exports.validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      message: 'Please provide all required fields' 
    });
  }
  
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
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
\`\`\`

## 8. Error Handling

\`\`\`javascript
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
\`\`\`

## 9. Environment Variables

\`\`\`bash
# .env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your_jwt_secret_here
\`\`\`

## 10. Real-World Example: E-Commerce API

In my e-commerce project, I built:

**Product Routes:**
\`\`\`javascript
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
POST   /api/products          # Create product (admin)
PUT    /api/products/:id      # Update product (admin)
DELETE /api/products/:id      # Delete product (admin)
\`\`\`

**Order Routes:**
\`\`\`javascript
POST   /api/orders            # Create order
GET    /api/orders/myorders   # Get user orders
GET    /api/orders/:id        # Get order by ID
\`\`\`

## Best Practices I Follow

1. **Use async/await** - Cleaner than callbacks
2. **Validate input** - Never trust user data
3. **Hash passwords** - Use bcrypt
4. **Rate limiting** - Prevent abuse
5. **CORS properly** - Whitelist domains
6. **Log errors** - Use Winston or Morgan
7. **API versioning** - \`/api/v1/users\`
8. **Documentation** - Use Swagger/Postman

## Testing Your API

\`\`\`bash
# Using Postman or curl
curl -X POST http://localhost:5000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Borifan","email":"test@example.com","password":"123456"}'
\`\`\`

## Deployment

I deploy my APIs on:
- **Vercel** - Serverless functions
- **Heroku** - Traditional hosting
- **Railway** - Modern alternative

\`\`\`bash
# Deploy to Vercel
npm i -g vercel
vercel
\`\`\`

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

#NodeJS #ExpressJS #MongoDB #API #Backend #MERN`,
    claps: 74,
    views: 1140,
    isBuiltIn: true,
  },
  {
    id: 'full-stack-development-roadmap',
    slug: 'full-stack-development-roadmap',
    title: 'Full Stack Development Roadmap: My Journey to MERN Stack Mastery',
    subtitle: 'From zero coding experience to building production web systems and enterprise apps',
    category: 'Career',
    icon: 'bx-code-curly',
    author: {
      name: 'Borifan Dabasa',
      role: 'Full Stack Software Engineer',
      avatar: 'image/me.png',
    },
    date: 'January 2025',
    readTime: '10 min read',
    tags: ['Career', 'MERN', 'Spring Boot', 'Roadmap', 'WebDev'],
    summary:
      'The comprehensive roadmap I followed to master modern full-stack development, moving from fundamental JavaScript and Java to enterprise distributed systems.',
    content: `# Full Stack Development Roadmap: My Journey to MERN Stack Mastery

*By Borifan Dabasa | Full Stack Developer & Software Engineering Student*

Two years ago, I started learning web development with zero coding experience. Today, I'm a Full Stack Developer building production applications with the MERN stack. This is the roadmap I wish I had when I started.

## My Story

I'm currently studying Software Engineering at Haramaya University while working as a freelance Full Stack Developer. I've built e-commerce platforms, appointment systems, and crypto trackers—all while learning on the job.

This roadmap is based on my real experience, not theory.

## Phase 1: The Foundation (2-3 months)

### HTML & CSS
Start here. No shortcuts.

**What I learned:**
- Semantic HTML5 elements
- CSS Flexbox and Grid
- Responsive design with media queries
- CSS animations and transitions

**Projects I built:**
- Personal portfolio website
- Landing pages
- Clone popular websites (Netflix, Spotify)

**Resources:**
- freeCodeCamp HTML/CSS course
- CSS Tricks for Flexbox/Grid
- MDN Web Docs (bookmark this!)

### JavaScript Fundamentals
This is where it gets real.

**Core concepts:**
\`\`\`javascript
// Variables and data types
let name = "Borifan";
const age = 22;

// Functions
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrays and objects
const skills = ['HTML', 'CSS', 'JavaScript'];
const developer = {
  name: 'Borifan',
  role: 'Full Stack Developer'
};

// ES6+ features
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// Async/Await
async function fetchData() {
  const response = await fetch('api/data');
  const data = await response.json();
  return data;
}
\`\`\`

**What to master:**
- Variables, functions, loops
- Arrays and objects
- DOM manipulation
- ES6+ features (arrow functions, destructuring, spread operator)
- Promises and async/await
- Fetch API

**Projects:**
- Todo list app
- Calculator
- Weather app using API

## Phase 2: Frontend Framework - React (2-3 months)

React changed everything for me.

### React Basics
\`\`\`jsx
// Component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// State
const [count, setCount] = useState(0);

// Effect
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

**Learn in order:**
1. JSX syntax
2. Components (functional)
3. Props and state
4. Hooks (useState, useEffect)
5. Event handling
6. Conditional rendering
7. Lists and keys
8. Forms

**Projects I built:**
- Movie search app
- E-commerce product catalog
- Blog with routing

### Advanced React
\`\`\`jsx
// Custom hooks
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Context API
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}
\`\`\`

**Advanced topics:**
- Context API
- Custom hooks
- React Router
- Performance optimization (memo, useMemo, useCallback)
- Code splitting

## Phase 3: Backend - Node.js & Express (2 months)

Time to build APIs.

### Node.js Basics
\`\`\`javascript
// server.js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
\`\`\`

**What to learn:**
- Node.js fundamentals
- Express.js framework
- RESTful API design
- Middleware
- Error handling
- Authentication (JWT)

**Projects:**
- User authentication API
- Blog API with CRUD operations
- File upload system

## Phase 4: Database - MongoDB (1-2 months)

### MongoDB with Mongoose
\`\`\`javascript
// User model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// CRUD operations
const user = await User.create({ name, email, password });
const users = await User.find();
const user = await User.findById(id);
await User.findByIdAndUpdate(id, { name: 'New Name' });
await User.findByIdAndDelete(id);
\`\`\`

**Learn:**
- MongoDB basics
- Mongoose ODM
- Schema design
- Relationships
- Aggregation
- Indexing

## Phase 5: Full Stack Integration (1-2 months)

Connect everything together.

### MERN Stack Architecture
\`\`\`
Frontend (React)
    ↓
API Calls (Axios/Fetch)
    ↓
Backend (Express)
    ↓
Database (MongoDB)
\`\`\`

### Example: User Registration Flow
\`\`\`javascript
// Frontend (React)
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await response.json();
};

// Backend (Express)
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  res.json({ user });
});
\`\`\`

**Projects to build:**
1. **Todo App** - Full CRUD with authentication
2. **Blog Platform** - Posts, comments, likes
3. **E-commerce** - Products, cart, checkout

## Phase 6: Advanced Topics (Ongoing)

### TypeScript
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (id: string): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
};
\`\`\`

### Next.js
- Server-side rendering
- Static site generation
- API routes
- File-based routing

### Testing
\`\`\`javascript
// Jest test
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// React Testing Library
render(<Button onClick={handleClick}>Click me</Button>);
fireEvent.click(screen.getByText('Click me'));
expect(handleClick).toHaveBeenCalled();
\`\`\`

## My Tech Stack Today

**Frontend:**
- React.js / Next.js
- TypeScript
- Tailwind CSS
- React Query

**Backend:**
- Node.js / Express.js
- MongoDB / Mongoose
- Spring Boot & PostgreSQL
- JWT Authentication
- RESTful APIs

**Tools:**
- Git & GitHub
- Docker
- VS Code & IntelliJ
- Postman
- Vercel & Railway

## Real Projects I Built

1. **E-Commerce Platform** - Full MERN stack with cart, payments
2. **Blog Website** - Next.js with TypeScript
3. **Crypto Tracker** - Real-time data with Chart.js
4. **Appointment System** - React with calendar integration
5. **Tax Audit Enterprise Platform** - Spring Boot & PostgreSQL

Check them out: [github.com/Borifan02](https://github.com/Borifan02)

## Tips from My Journey

1. **Build projects, not tutorials** - I learned more from one real project than 10 tutorials
2. **Don't get stuck in tutorial hell** - Watch, code along, then build something different
3. **Git from day one** - Commit everything
4. **Deploy early** - Use Vercel, Netlify, Heroku
5. **Read documentation** - It's your best friend
6. **Join communities** - Twitter, Discord, Reddit
7. **Don't compare** - Everyone's journey is different
8. **Consistency > Intensity** - Code every day, even 30 minutes

## Common Mistakes I Made

1. **Skipping fundamentals** - Went to React too fast
2. **Not using Git properly** - Lost code multiple times
3. **Ignoring responsive design** - Had to rebuild projects
4. **Not testing** - Bugs in production
5. **Overcomplicating** - Simple solutions work best

## Timeline Reality Check

**My actual timeline:**
- Month 1-3: HTML, CSS, JavaScript
- Month 4-6: React.js
- Month 7-8: Node.js, Express
- Month 9-10: MongoDB, Full Stack projects
- Month 11-12: TypeScript, Next.js & Spring Boot
- Ongoing: Learning and building

**Your timeline might be different.** That's okay.

## Let's Connect

I'm always happy to help fellow developers:

- **GitHub:** [@Borifan02](https://github.com/Borifan02)
- **LinkedIn:** [Borifan Dabasa](http://www.linkedin.com/in/borifan-dabasa-a5191036b)
- **Email:** dabasaborifan@gmail.com
- **Portfolio:** [Live Demo](https://borifan-blog.vercel.app/)

---

*Remember: Every expert was once a beginner. The only difference is they didn't give up.*

#WebDevelopment #MERN #FullStack #JavaScript #React #NodeJS #MongoDB #CareerAdvice`,
    claps: 92,
    views: 1680,
    isBuiltIn: true,
  },
];

export const INITIAL_COMMENTS = {
  'building-scalable-react-applications': [
    {
      id: 'c1',
      author: 'Abebe Kebede',
      date: 'Feb 1, 2025',
      text: 'The folder structure recommendation completely simplified our team workflow. Breaking down large components made code reviews 10x faster!',
    },
    {
      id: 'c2',
      author: 'Sophia Chen',
      date: 'Feb 4, 2025',
      text: 'Great tip on Context vs Redux. People often reach for heavyweight state libraries too early. Simple is better.',
    },
  ],
  'nodejs-api-development-guide': [
    {
      id: 'c3',
      author: 'Dawit Tadesse',
      date: 'Feb 10, 2025',
      text: 'The centralized error handling middleware is super clean. Bookmarked for my upcoming project.',
    },
  ],
  'full-stack-development-roadmap': [
    {
      id: 'c4',
      author: 'Marcus Vance',
      date: 'Jan 28, 2025',
      text: 'Inspiring journey! Going from zero coding to MERN and Spring Boot enterprise projects in that timeframe is commendable.',
    },
    {
      id: 'c5',
      author: 'Hanan Mohammed',
      date: 'Feb 2, 2025',
      text: 'I loved the emphasis on "Consistency > Intensity". Starting today with Phase 1!',
    },
  ],
};

// LocalStorage Helpers
export function loadStoredBlogPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_POSTS);
    if (!raw) return INITIAL_BLOG_POSTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure seed posts always exist or are merged
      const customPosts = parsed.filter((p) => !p.isBuiltIn);
      const builtInOverrides = parsed.filter((p) => p.isBuiltIn);
      // Merge with INITIAL_BLOG_POSTS
      const finalPosts = INITIAL_BLOG_POSTS.map((base) => {
        const override = builtInOverrides.find((o) => o.id === base.id);
        return override ? { ...base, ...override } : base;
      });
      return [...customPosts, ...finalPosts];
    }
  } catch (err) {
    console.error('Failed to load blog posts from localStorage', err);
  }
  return INITIAL_BLOG_POSTS;
}

export function saveStoredBlogPosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
  } catch (err) {
    console.error('Failed to save blog posts', err);
  }
}

export function loadStoredLikes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIKES);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveStoredLikes(likes) {
  try {
    localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(likes));
  } catch (err) {
    console.error('Failed to save likes', err);
  }
}

export function loadStoredBookmarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredBookmarks(bookmarks) {
  try {
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
  } catch (err) {
    console.error('Failed to save bookmarks', err);
  }
}

export function loadStoredComments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMMENTS);
    if (!raw) return INITIAL_COMMENTS;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_COMMENTS, ...parsed };
  } catch {
    return INITIAL_COMMENTS;
  }
}

export function saveStoredComments(comments) {
  try {
    localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(comments));
  } catch (err) {
    console.error('Failed to save comments', err);
  }
}

export function calculateReadTime(text = '') {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function generateSlug(title = '') {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

