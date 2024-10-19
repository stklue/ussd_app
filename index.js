const express = require('express');
const app = express();
const PORT = 3000;

// Route to handle GET request at the root
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
