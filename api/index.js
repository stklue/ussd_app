const express = require("express");
const app = express();
const PORT = 3000;

// Route to handle GET request at the root
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// USSD API endpoint
app.post("/ussd", (req, res) => {
  const { sessionId, networkCode, serviceCode, phoneNumber, text } = req.body;

  let response = "";

  // Check if this is the first session or process user input
  if (text === "") {
    console.log(text);
    // This is the first request. Note how we start the response with CON
    response = `CON What would you like to do
        1. Check my account
        2. Make Payment`;
  } else if (text === "1") {
    // Business logic for first level response
    response = `CON Choose account information you want to view
        1. Account number
        2. Account balance`;
  } else if (text === "2") {
    // Business logic for first level response
    // This is a terminal request. Note how we start the response with END
    // response = `END Your phone number is ${phoneNumber}`;
    response = `CON Enter recipient id (their url)`;
    accountNumber = text;
    if (text != "") {
      response = `CON Enter the amount you want to send`;
      if (text != "") {
        response = `END Send amount ${text} to ${accountNumber}`;
      }
    }
  } else if (text === "1*1") {
    // This is a second level response where the user selected 1 in the first instance
    const accountNumber = "ACC100101";
    // This is a terminal request. Note how we start the response with END
    response = `END Your account number is ${accountNumber}`;
  } else if (text === "1*2") {
    // This is a second level response where the user selected 1 in the first instance
    const balance = "KES 10,000";
    // This is a terminal request. Note how we start the response with END
    response = `END Your balance is ${balance}`;
  }

  // Send the response back as plain text
  res.set("Content-Type", "text/plain");
  res.send(response);
});

module.export = app;
