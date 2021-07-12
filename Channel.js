const {sequelize, DataTypes, Model} = require('./db');

class Channel extends Model {
    
}

Channel.init({
    name: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    numVideos: DataTypes.INTEGER,
    numSub: DataTypes.INTEGER,
    numViews: DataTypes.INTEGER
}, {
	sequelize,
	timestamps: false,
});

module.exports = { Channel }