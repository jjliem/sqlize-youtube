const {sequelize, DataTypes, Model} = require('./db');

class CommentSection extends Model {
    
}

CommentSection.init({
	numComments: DataTypes.INTEGER,
	isEnabled: DataTypes.BOOLEAN
}, {
	sequelize,
	timestamps: false,
});

module.exports = { CommentSection }