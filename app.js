const express = require('express');
const { initDatabase } = require('./database');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const jobRoutes = require('./routes/job');

const app = express();

app.use(express.json());

// Initialize database
initDatabase();

// Use routes
app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);
app.use('/jobs', jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});