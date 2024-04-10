const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const db=require("./configs/db")
// Middleware
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
 const enrollmentRoutes = require('./routes/enrollRoutes');
app.use('/api/users', userRoutes);
app.use('/api', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Error handling middleware
// const { handleErrors } = require('./utils/errorHandlers');
// app.use(handleErrors);

db.connect()
  .then(() => {
    console.log('Connected to Neon');
  })
  .catch(err => {
    console.error('Error connecting to Neon:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
