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
  // const { text } = req.body; // Get the input from the request
  const inputArray = text.split("*"); // Split the input by '*'

  // Check the first input to determine the flow
  switch (inputArray[0]) {
    case "":
      // First session - user sees initial menu
      response = `CON What would you like to do
        1. Check my account
        2. Make Payment`;
      break;

    case "1":
      // User wants to check account information
      if (inputArray.length === 1) {
        response = `CON Choose account information you want to view
          1. Account number
          2. Account balance`;
      } else if (inputArray[1] === "1") {
        response = `END Your account number is ACC100101`;
      } else if (inputArray[1] === "2") {
        response = `END Your balance is KES 10,000`;
      } else {
        response = `END Invalid selection. Please try again.`;
      }
      break;

    case "2":
      // User wants to make a payment
      if (inputArray.length === 1) {
        response = `CON Enter recipient ID (their URL)`;
      } else if (inputArray.length === 2) {
        response = `CON Enter the amount you want to send to ${inputArray[1]}`;
      } else if (inputArray.length === 3) {
        response = `END Send amount ${inputArray[2]} to recipient ID ${inputArray[1]}`;
      } else {
        response = `END Invalid input. Please try again.`;
      }
      break;

    default:
      response = `END Invalid input. Please try again.`;
      break;
  }
  // Send the response back as plain text
  res.set("Content-Type", "text/plain");
  res.send(response);
});

module.export = app;
