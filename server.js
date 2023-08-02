const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000; // Use the port provided by the environment or 3000 by default

// Middleware
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cors());

// Define your routes and middlewares here

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
