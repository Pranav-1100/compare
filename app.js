require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Add this line
const { initDatabase } = require('./database');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const jobRoutes = require('./routes/job');
const careerRoutes = require('./routes/career');
const analyticsRoutes = require('./routes/analytics');
const app = express();

// Use CORS middleware
app.use(cors()); // Add this line

app.use(express.json());

// Initialize database
initDatabase();

// Use routes
app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);
app.use('/jobs', jobRoutes);
app.use('/career', careerRoutes);
app.use('/analytics', analyticsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});