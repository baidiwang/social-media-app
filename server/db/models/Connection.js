const Sequelize = require('sequelize');
const db = require('../db');
//followingId, followerId
const Connection = db.define('connection', {
    isAccepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    // isBlocked: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: false
    // }
});
module.exports = Connection;