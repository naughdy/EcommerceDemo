const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const users = [];
const products = [];

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// User registration
app.post('/api/register', async (req, res) => {
    const { username, password, theme } = req.body;

    // Simple email validation
    if (!username.includes('@')) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    let user = users.find(u => u.username === username);

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = { id: uuidv4(), username, password: hashedPassword, theme };
    users.push(user);

    res.json({ message: 'User registered successfully', user });
  });

  // User login
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username.includes('@')) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'User logged in successfully', user, token });
  });

// Get user profile
app.get('/api/profile/:userId', (req, res) => {
  const user = users.find(u => u.id === req.params.userId);
  if (!user) { return res.status(404).json({ error: 'User not found' }); }

  res.json({ user });
});

// Add a new product
app.post('/api/products', upload.single('media'), (req, res) => {
  const { userId, name, description, price } = req.body;
  const media = req.file ? `/uploads/${req.file.filename}` : null;

  const newProduct = { id: products.length + 1, userId, name, description, price, media };
  products.push(newProduct);

  res.json({ message: 'Product added successfully', product: newProduct });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get a product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) { return res.status(404).json({ error: 'Product not found' }); }

  res.json(product);
});

app.post('/api/update-theme', (req, res) => {
    const { userId, theme } = req.body;

    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.theme = theme;
    res.json({ message: 'Theme updated successfully', user });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
