const express = require("express");
const cors = require("cors"); // Import the cors module
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware: Parse request data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS

// Route: GET request to /api
app.get("/api", (req, res) => {
  const data = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" },
  ];
  res.json(data);
});

// Route: POST request to /
app.post("/", (req, res) => {
  // Assuming the request body contains JSON data
  const data = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" },
  ];
  const receivedData = req.body;
  console.log("Received data:", receivedData);
  res.send(data);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
