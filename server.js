// server.js
const { spawn } = require("child_process");
const express = require("express");

const app = express();
const port = 3001; // Changing the port to 3001

// Define data to be sent to Python script
const dataToSend = JSON.stringify({ message: "Hello from Node.js!" });

// Spawn Python process
const pythonProcess = spawn("python", ["script.py"]);

// Send data to Python script
pythonProcess.stdin.write(dataToSend);
pythonProcess.stdin.end();

// Receive result from Python script
pythonProcess.stdout.on("data", (data) => {
  console.log(`Received result from Python: ${data}`);
});

// Handle Python script exit
pythonProcess.on("exit", (code) => {
  console.log(`Python script exited with code ${code}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
