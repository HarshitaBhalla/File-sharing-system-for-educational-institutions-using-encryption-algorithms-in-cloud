'use strict'
const crypto = require('crypto');
const {performance} = require('perf_hooks');
const sharedKey = require('../helpers/exportSharedKey');
const db = require('../models');

module.exports= (req,res)=>{

    const MESSAGE = req.body.msg;
    console.log("Teacher wants to send this message: "+ MESSAGE);

    var msgEncryptionStart = performance.now();
    const IV = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(sharedKey.sharedECDHKey, 'hex'),
    IV
    );

    let encrypted = cipher.update(MESSAGE, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const auth_tag = cipher.getAuthTag().toString('hex');

    console.table({
    IV: IV.toString('hex'),
    encrypted: encrypted,
    auth_tag: auth_tag
    });

    const payload = IV.toString('hex') + encrypted + auth_tag;

    const payload64 = Buffer.from(payload, 'hex').toString('base64');
    console.log(payload64);

    db.models.messages.create({
        message: payload64
    }).then(message=>{
        console.log("successfully stored in the db"+message.message);
    })
    res.json({success: "success"});

    var msgEncryptionEnd = performance.now();

};