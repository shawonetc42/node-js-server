const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/api", (req, res) => {
  const data = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" },
  ];
  res.json(data);
});

// Update the route to handle POST requests to /api
app.post("/api", (req, res) => {
  const receivedData = req.body;
  console.log("Received data:", receivedData);
  // Assuming you want to send back the same data as response
  res.json(receivedData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
