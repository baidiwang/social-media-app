const Sequelize = require('sequelize');
const db = require('../db');

const Comment = db.define('comment', {
    body : {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        get: function(){
            //not sure if I can put a getter on createdAt but below just add a format for output of date
            return this.getDataValue('createdAt').toLocaleString('en-US');
        }
    }
});

module.exports = Comment;