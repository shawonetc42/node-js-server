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

// Route to get data from the database
app.get("/data", (req, res) => {
  admin
    .database()
    .ref("statuses")
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

// Route to add data to the database
app.post("/data", (req, res) => {
  const newData = req.body;

  admin
    .database()
    .ref("statuses")
    .push(newData)
    .then(() => {
      res.status(201).json({ message: "Data added successfully" });
    })
    .catch((error) => {
      console.error("Error adding data:", error);
      res.status(500).json({ error: "Failed to add data to the database" });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
