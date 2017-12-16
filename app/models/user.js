module.exports = function(sequelize, DataTypes) {
	var User_List = sequelize.define("User_List", {
	username: DataTypes.STRING,
	password: DataTypes.STRING
	});
	//  User_List.prototype.verifyUser()
	// User_List.prototype.verifyPassword()
		return User_List;
};