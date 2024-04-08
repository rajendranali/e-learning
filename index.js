const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
// const userRoutes = require('./routes/userRoutes');
// const courseRoutes = require('./routes/courseRoutes');
// const enrollmentRoutes = require('./routes/enrollmentRoutes');
// app.use('/api/users', userRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/enrollments', enrollmentRoutes);

// Error handling middleware
// const { handleErrors } = require('./utils/errorHandlers');
// app.use(handleErrors);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
