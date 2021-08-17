const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.dao = require("./dao.model");
db.socialMedia = require("./socialMedia.model");


module.exports = db;