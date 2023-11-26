const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());

// Connect to MongoDB
mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Parse JSON request bodies
app.use(express.json());

// Mount routes
app.use(userRoutes);


// Start the server
app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
