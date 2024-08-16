const express = require('express');
const { initDatabase } = require('./database');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

const app = express();

app.use(express.json());

// Initialize database
initDatabase();

// Use routes
app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});