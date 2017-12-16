// **********************************************************************
// api-routes.js - set of routes for displaying and saving data to the db
// **********************************************************************

// Dependencies
var db = require("../models");
var axios = require('axios');
// Routes
module.exports = function(app) {
	// app.post("/api/coins", function(req, res) {
	// 	db.Coin.create(req.body).then(function(dbCoin) {
	// 		res.json(dbCoin);
	// 	})
	// });
	app.get("/current_api_data", function(req, res) {
		axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=10").then(function(response){
			console.log(response.data);
			res.json({status: response.data});
		}).catch(function(err){
			console.log(err);
		})
	})
};