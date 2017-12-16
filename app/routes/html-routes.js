// **********************************************************************
// html-routes.js - set of routes for sending users to specified pages.
// **********************************************************************

// Dependencies
var path = require("path");

module.exports = function(app) {
	// Index route, loads index.html
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/login.html"));
	});

	// Dashboard route, loads dashboard.html
	app.get("/dashboard", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/dashboard.html"));
	});

	// Charts route, loads charts.html
	app.get("/charts", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/charts.html"));
	});

	// Tables route, loads tables.html
	app.get("/tables", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/tables.html"));
	});
};