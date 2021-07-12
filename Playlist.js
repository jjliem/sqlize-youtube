const {sequelize, DataTypes, Model} = require('./db');

class Playlist extends Model {
    
}

Playlist.init({
    name: DataTypes.STRING
}, {
	sequelize,
	timestamps: false,
});

module.exports = { Playlist }