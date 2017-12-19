const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const mysql2 = require('mysql2');


//create sequelize instance with local database
const sequelize = new Sequelize('mysql://root:love143831@localhost:3306/coindb');

// setup User model and its fields.
const user = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
})

user.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
// create all the defined tables in the specified database.
sequelize.sync()
// sequelize.sync({force:true})
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = user;