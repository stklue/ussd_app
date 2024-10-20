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
  // let response;
  let registrationStep = ""; // Tracks the current step in registration
  let userName = "";
  let userPhone = "";
  let userEmail = "";
  let paymentStep = ""; // Tracks the current step in payment
  let paymentId = ""; // Recipient ID for payment
  let paymentAmount = ""; // Amount to pay

  function handleRegistrationAndPayment(text) {
    if (registrationStep === "") {
      response =
        "CON Welcome to the Payment Registration!\n" +
        "Please enter your name:";
      registrationStep = "enterName"; // Move to the next step
    } else {
      switch (registrationStep) {
        case "enterName":
          userName = text.trim(); // Capture the user's name
          response =
            "CON Thank you, " +
            userName +
            ".\n" +
            "Please enter your phone number:";
          registrationStep = "enterPhone"; // Move to the next step
          break;

        case "enterPhone":
          userPhone = text.trim(); // Capture the user's phone number
          response = "CON Please enter your email address:";
          registrationStep = "enterEmail"; // Move to the next step
          break;

        case "enterEmail":
          userEmail = text.trim(); // Capture the user's email address
          response =
            `END Registration complete!\n` +
            `Name: ${userName}\n` +
            `Phone: ${userPhone}\n` +
            `Email: ${userEmail}\n` +
            `Thank you for registering for payments!\n\n` +
            "CON Now, please enter the recipient ID to make a payment:";
          paymentStep = "enterPaymentId"; // Move to payment step
          break;

        case "enterPaymentId":
          paymentId = text.trim(); // Capture the recipient ID
          response =
            "CON You are about to make a payment to ID: " +
            paymentId +
            "\n" +
            "Please enter the amount you wish to send:";
          paymentStep = "enterPaymentAmount"; // Move to the next step
          break;

        case "enterPaymentAmount":
          paymentAmount = text.trim(); // Capture the payment amount
          response =
            `END Payment of ${paymentAmount} to ID ${paymentId} has been initiated.\n` +
            `Name: ${userName}\n` +
            `Phone: ${userPhone}\n` +
            `Email: ${userEmail}\n` +
            `Thank you for your payment!`;
          // Reset the steps for new registration or payment
          registrationStep = "";
          paymentStep = "";
          break;

        default:
          response =
            "END Invalid input. Please restart the registration or payment process.";
          registrationStep = ""; // Reset the step
          paymentStep = "";
          break;
      }
    }

    // return response;
  }

  // Example usage
  // console.log(handleRegistrationAndPayment('')); // Initial call to start registration
  // console.log(handleRegistrationAndPayment('John Doe')); // User enters their name
  // console.log(handleRegistrationAndPayment('1234567890')); // User enters their phone number
  // console.log(handleRegistrationAndPayment('john@example.com')); // User enters email
  // console.log(handleRegistrationAndPayment('user123')); // User enters recipient ID
  // console.log(handleRegistrationAndPayment('1500')); // User enters payment amount

  // Send the response back as plain text
  res.set("Content-Type", "text/plain");
  res.send(response);
});

module.export = app;
