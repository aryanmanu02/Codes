// mkdir bookstore-api
// cd bookstore-api
// npm init -y

// npm install express mongoose body-parser
// npm install --save-dev nodemon
// "scripts": {
//   "start": "nodemon index.js"
// }

// /bookstore-api
//     ├── models
//     │   └── Product.js
//     ├── routes
//     │   └── productRoutes.js
//     ├── .env
//     ├── server.js

// Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  publishedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);


// productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products (books)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product (book)
router.post('/', async (req, res) => {
  const product = new Product({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.title = req.body.title || product.title;
    product.author = req.body.author || product.author;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


//index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// npm start
// Visit http://localhost:3000/api/products to test the routes using Postman or cURL.


// POST: Add a new product:

// json

// POST /api/products
// {
//   "title": "The Great Gatsby",
//   "author": "F. Scott Fitzgerald",
//   "price": 10.99,
//   "category": "Fiction",
//   "stock": 50
// }



// GET: Retrieve all products:

// bash
// Copy code
// GET /api/products
// GET: Retrieve a specific product by ID:

// bash

// GET /api/products/:id


// PUT: Update a product by ID:

// json

// PUT /api/products/:id
// {
//   "stock": 100
// }


// DELETE: Delete a product by ID:

// Copy code
// DELETE /api/products/:id