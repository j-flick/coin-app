// **********************************************************************
// connection.js - setup connection to MySQL
// **********************************************************************

// Dependencies
var Sequelize = require("sequelize");

// Create MySQL connection using Sequelize.
var sequelize = new Sequelize("dbName", "root", "password", {
	host: "localhost",
	dialect: "mysql",
	 // Use pooling in order to reduce db connection overload and to increase speed
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

// Export the connection.
module.exports = sequelize;