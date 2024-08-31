const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const routes = require('./routes');
app.use(cors());
// Load mock data
//app.use(bodyParser.json()); // For parsing application/json

// Serve static files if needed (e.g., if you have static assets)
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const mockData = require('./mockData.json');
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./routes/index.js');
// const sequelize = require('./db.js');

// const app = express();

// app.use(bodyParser.json());
// app.use('/api', routes);

// // Sync Database
// sequelize.sync()
//     .then(() => {
//         console.log('Database connected & synchronized successfully.');
//     })
//     .catch((err) => {
//         console.error('Failed to connect to the database:', err);
//     });

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
