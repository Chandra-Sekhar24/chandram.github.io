const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 5500; // Change this to your desired port

// Body parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/hire-me', (req, res) => {
  const { name, email, message } = req.body;

  // Configure nodemailer with your email server details
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chandramphanidapu@gmail.com', // Replace with your email
      pass: 'chandram#24',  // Replace with your email password
    },
  });

  // Email content
  const mailOptions = {
    from: 'chandramphanidapu@gmail.com', // Replace with your email
    to: 'chandramphanidapu@gmail.com',   // Replace with your email
    subject: 'New Hire Me Request',
    text: `Name: ${name}\nEmail: ${email}\nSubject:${subject}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Hire Me request submitted successfully!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//const express = require('express');
//const nodemailer = require('nodemailer');
//const bodyParser = require('body-parser');

/*const app = express();
const port = 3000;*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/hire-me', (req, res) => {
  // Extract relevant data from the request (e.g., sender's information)
  const senderName = req.body.name || 'Unknown User';
  const senderEmail = req.body.email || 'no-reply@example.com';

  // Replace the following with your email configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chandramphanidapu@gmail.com',
      pass: 'chandram#24',
    },
  });

  // Replace 'your.email@gmail.com' with your actual email address
  const mailOptions = {
    from: 'chandramphanidapu@gmail.com',
    to: 'chandramphanidapu@gmail.com',
    subject: 'New Hire Me Request',
    text: `You have a new hire me request from ${senderName} (${senderEmail}).`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Hire Me request submitted successfully!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
