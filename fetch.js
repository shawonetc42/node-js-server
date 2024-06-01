// fetch.js

// Simulated function to fetch data asynchronously
async function fetchData() {
  // Simulate an asynchronous operation (e.g., fetching from a database or external API)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
      ];
      resolve(data);
    }, 1000); // Simulate a delay of 1 second
  });
}

module.exports = fetchData;
