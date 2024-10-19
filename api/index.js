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


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// USSD API endpoint
app.post('/ussd', (req, res) => {
  const { sessionId, networkCode, serviceCode, phoneNumber, text } = req.body;

  let response = '';

  // Check if this is the first session or process user input
  if (text === '') {
    response = 'CON Language Frameworks:\n1. Java\n2. Python\n3. PHP\n4. JavaScript';
  } else {
    const textArray = text.split('*');
    switch (textArray[0]) {
      case '1':
        response = 'END Java Frameworks:\n1. SpringBoot\n2. Apache Struts';
        break;
      case '2':
        response = 'END Python Frameworks:\n1. Flask\n2. Django\n3. PyTorch';
        break;
      case '3':
        response = 'END PHP Frameworks:\n1. Laravel\n2. Symfony\n3. CodeIgniter';
        break;
      case '4':
        response = 'END JavaScript Frameworks:\n1. NodeJS\n2. ReactJS\n3. TypeScript';
        break;
      default:
        response = 'END Invalid input';
        break;
    }
  }

  // Send the response back as plain text
  res.set('Content-Type', 'text/plain');
  res.send(response);
});



module.export = app