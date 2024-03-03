const mongoose = require('mongoose');

const VaultSchema = new mongoose.Schema({
    userId: String,
    title: String,
    username: String,
    password: String
}, {collection: 'vaults'});

module.exports = mongoose.model('Vault', VaultSchema);
