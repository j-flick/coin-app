const Sequelize = require('sequelize');
const mysql = require('mysql');
const mysql2 = require('mysql2');
//const user = require('./user.js');

const sequelize = new Sequelize('mysql://root:love143831@127.0.0.1:3306/coindb');

const portfolio = sequelize.define('portfolio', {
        // userId: {
        //       type: Sequelize.INTEGER,
        //       references: 'users', 
        //       referencesKey: 'id'
       // },
        Coin: {
        	type: Sequelize.STRING,
        	allowNull: false
        },
        Amount: {
        	type: Sequelize.INTEGER,
        	allowNull: false
        }
});

// users.hasMany(Portfolio);

//create calls here
//portfolio.prototype.displayTable =
//portfolio.prototype.addUpdateNew = function(userID, Coin, Amount){ return userID where username=req.user if Coin=? return Amount if count(Coin)=0 update.Portfolio UserID=(users.id where req.user=username} Coin=body.Coin Amount=(res.portfolio.amount + body.amount)
//portfolio.protype.deleteCoin = function (userID, Coin){ select user Id where req.user=users.username from users, delete where userID=res and Coin=body.Coin}

return portfolio;

module.exports = portfolio;