const mongoose = require('mongoose')

const userStatsSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    name: {type: String, required: true},
    stats: { type: Object, required: true },
});

const UserStats = mongoose.model('UserStats', userStatsSchema);

module.exports = UserStats