const {sequelize, DataTypes, Model} = require('./db');

class Video extends Model {
    
}

Video.init({
	name: DataTypes.STRING,
}, {
	sequelize,
	timestamps: false,
});

module.exports = { Video }