// app.js

const express = require("express");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.PORT || 3001;

// Firebase Admin SDK configuration
const serviceAccount = require("./jefred-com-firebase-adminsdk-44uyg-a2a5e76c43.json"); // Update with your JSON file path
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://jefred-com-default-rtdb.asia-southeast1.firebasedatabase.app", // Update with your database URL
};

// Initialize Firebase Admin SDK
admin.initializeApp(firebaseConfig);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get a specific post by uniqueId
app.get("/posts/:uniqueId", (req, res) => {
  const uniqueId = req.params.uniqueId;

  admin
    .database()
    .ref("Users/Profile/status")
    .orderByChild("uniqueId")
    .equalTo(parseInt(uniqueId))
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Get the first (and should be only) child key and its value
        const key = Object.keys(data)[0];
        const post = data[key];
        res.json(post);
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    })
    .catch((error) => {
      console.error("Error getting data:", error);
      res.status(500).json({ error: "Failed to get data from the database" });
    });
});
// Route to get all posts from the database
app.get("/posts", (req, res) => {
  admin
    .database()
    .ref("Users/Profile/status")
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      res.json(data);
    })
    .catch((error) => {
      console.error("Error getting data:", error);
      res.status(500).json({ error: "Failed to get data from the database" });
    });
});

// Route to add a new post to the database
app.post("/posts", (req, res) => {
  const newPost = req.body;

  // Check if uniqueId is present
  if (!newPost.uniqueId) {
    return res.status(400).json({ error: "uniqueId is required" });
  }

  admin
    .database()
    .ref("statuses")
    .push(newPost)
    .then(() => {
      res.status(201).json({ message: "Post added successfully" });
    })
    .catch((error) => {
      console.error("Error adding post:", error);
      res.status(500).json({ error: "Failed to add post to the database" });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
