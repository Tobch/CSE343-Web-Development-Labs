const express = require("express");
const app = express();

// Middleware to parse the JSON payload of incoming requests
app.use(express.json());

// In-memory storage for our posts
let posts = []; 
let currentId = 1; // Simple counter to assign unique IDs to posts

// --- 1. CREATE: Add a new post ---
app.post("/posts", (req, res) => {
    const post = {
        id: currentId++, // Assign an ID and increment the counter
        title: req.body["title"],
        content: req.body["content"]
    };
    
    console.log(`Adding this new post: ${JSON.stringify(post)}`);
    posts.push(post);
    
    // Respond with status 201 (Created) and the newly created post data
    res.status(201).json(post); 
});

// --- 2. READ: Get all posts ---
app.get("/posts", (req, res) => {
    // Send the entire array as a JSON response
    res.json(posts);
});

// --- 3. READ: Get a specific post by ID ---
app.get("/posts/:id", (req, res) => {
    // Access the path parameter
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).send("Post not found");
    }
});

// --- 4. UPDATE: Modify an existing post ---
app.put("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex !== -1) {
        // Update the post with new data from the request body
        posts[postIndex].title = req.body.title || posts[postIndex].title;
        posts[postIndex].content = req.body.content || posts[postIndex].content;
        
        res.json(posts[postIndex]);
    } else {
        res.status(404).send("Post not found");
    }
});

// --- 5. DELETE: Remove a post ---
app.delete("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const initialLength = posts.length;
    
    // Filter out the post with the matching ID
    posts = posts.filter(p => p.id !== postId);

    if (posts.length < initialLength) {
        res.status(204).send(); // 204 No Content is standard for successful deletion
    } else {
        res.status(404).send("Post not found");
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});