// mkdir blog-backend
// cd blog-backend

// npm init -y


// npm install express mongoose body-parser
// npm install --save-dev nodemon


// "scripts": {
//   "start": "nodemon index.js"
// }

// /blog-backend
//     ├── models
//     │   └── Post.js
//     ├── routes
//     │   └── postRoutes.js
//     ├── .env
//     ├── server.js



// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import routes for posts
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//Post.js

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);

//postRoutes.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


//
// The API will now be running on http://localhost:3000/api/posts.

// Example API Endpoints
// GET /api/posts: Retrieves all blog posts.

// GET /api/posts/:id: Retrieves a specific post by its ID.

// POST /api/posts: Creates a new post. Sample request body:

// json
// Copy code
// {
//   "title": "My First Blog Post",
//   "content": "This is the content of the blog post.",
//   "author": "John Doe"
// }
// DELETE /api/posts/:id: Deletes a post by its ID.

// Example API Requests Using Postman or cURL
// POST: Create a new blog post:

// bash
// Copy code
// POST /api/posts
// Content-Type: application/json

// {
//   "title": "New Post",
//   "content": "This is a new blog post.",
//   "author": "Jane Smith"
// }
// GET: Retrieve all blog posts:

// bash
// Copy code
// GET /api/posts
// GET: Retrieve a single post by its ID:

// bash
// Copy code
// GET /api/posts/:id
// DELETE: Delete a post by its ID:

// bash
// Copy code
// DELETE /api/posts/:id