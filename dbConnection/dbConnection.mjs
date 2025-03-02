import { Sequelize } from 'sequelize';

// Create a sequelize instance with connection pooling
const sequelize = new Sequelize('example', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  // Configure connection pool
  pool: {
    max: 5,           // Maximum number of connections in pool
    min: 0,           // Minimum number of connections in pool
    acquire: 30000,   // Maximum time (ms) to get a connection from pool
    idle: 10000       // Maximum time (ms) connection can be idle before being released
  },
  // Keep connection alive with periodic pings
  keepAlive: true,
  // Disable logging of SQL queries
  logging: false
});

// Establish and test the connection
const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // return sequelize; // Return the sequelize instance for further use
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Rethrow to allow handling elsewhere
  }
};

// Export for use in other modules
export { sequelize, dbConnection };