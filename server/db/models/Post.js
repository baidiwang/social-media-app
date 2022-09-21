const Sequelize = require("sequelize");
const db = require("../db");

const Post = db.define('post', {
    body: {
        type: Sequelize.TEXT
    },
    date: {
        type: Sequelize.DATE,
        get: function(){
            //not sure if I can put a getter on createdAt but below just add a format for output of date
            return this.getDataValue('createdAt').toLocaleString('en-US');
        }
    }
});

module.exports = Post;
