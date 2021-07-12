const {sequelize, DataTypes, Model} = require('./db');
const {Channel} = require('./Channel');
const {Playlist} = require('./Playlist');
const {Video} = require('./Video');
const {CommentSection} = require('./CommentSection');
const {Comment} = require('./Comment');

Channel.hasMany(Video)
Video.belongsTo(Channel)

Playlist.hasMany(Video)
Video.belongsTo(Playlist)

Video.hasOne(CommentSection)
CommentSection.belongsTo(Video)

CommentSection.hasMany(Comment, {as: 'comments', foreignKey: 'comsec_id'})
Comment.belongsTo(CommentSection, {foreignKey: 'comsec_id'})


module.exports = { Channel, Playlist, Video, CommentSection, Comment };