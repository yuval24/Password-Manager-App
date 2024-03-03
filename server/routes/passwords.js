const mongoose = require('mongoose');
const router = require('express').Router();
const Vault = require('../models/vault');
const passport = require('passport');
const utils = require('../libs/utils');
const crypto = require('crypto');
const fs = require('fs');

const pemKey = fs.readFileSync('id_aesKey.pem', 'utf8');
const aesKeyBase64 = pemKey.toString('base64').split('\n')[1];
const aesKey = Buffer.from(aesKeyBase64, 'base64');
const iv = crypto.randomBytes(16);

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        
        const vaultId = req.params.id;
        const deletedVault = await Vault.findByIdAndDelete(vaultId);
        if (!deletedVault) {
            return res.status(404).json({ success: false, msg: "Vault not found" });
        }

        res.status(200).json({ success: true, msg: "The Vault was deleted" });
    } catch (err) {
        next(err);
    }
});


router.get('/vaults', passport.authenticate('jwt', {session: false}), async (req, res, next) => {    
    try {

        const vaults = await Vault.find({ userId: req.user._id });
        const decryptedVaults = vaults.map(vault => {
            const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
            let decryptedPassword = decipher.update(vault.password, 'base64', 'utf8');
            decryptedPassword += decipher.final('utf8');
            return { ...vault.toObject(), password: decryptedPassword };
        });
        res.status(200).json(decryptedVaults);
    } catch (err) {
        next(err);
    }
});

router.post('/insert', passport.authenticate('jwt', {session: false}), async (req, res, next) => {

    try {
        const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
        let encryptedPassword = cipher.update(req.body.password, 'utf8', 'base64');
        encryptedPassword += cipher.final('base64');

        const newVault = new Vault({
            userId: req.user._id,
            title: req.body.title,
            username: req.body.username,
            password: encryptedPassword,
        });

        await newVault.save();
        res.status(200).json({ success: true, msg: "The Vault was saved" });
    } catch (err) {
        next(err);
    }
});
module.exports = router;
