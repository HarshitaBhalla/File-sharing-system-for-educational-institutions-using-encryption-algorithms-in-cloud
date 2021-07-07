'use strict'
const crypto = require('crypto');
const {performance} = require('perf_hooks');
const sharedKey = require('../helpers/exportSharedKey');
const db = require('../models');

module.exports=(req,res)=>{

    db.models.messages.findAll()
        .then(messages =>{
            let msgs = [];
            messages.forEach(message =>{
                let msg = message.message;
                let created_at= message.created_at
                let student_payload = Buffer.from(msg, 'base64').toString('hex');
                let student_iv = student_payload.substr(0, 32);
                let student_encrypted = student_payload.substr(32, student_payload.length - 32 - 32);
                let student_auth_tag = student_payload.substr(student_payload.length - 32, 32);
                console.table({ student_iv, student_encrypted, student_auth_tag });
                try {
                    const decipher = crypto.createDecipheriv(
                    'aes-256-gcm',
                    Buffer.from(sharedKey.sharedECDHKey, 'hex'),
                    Buffer.from(student_iv, 'hex')
                );
                decipher.setAuthTag(Buffer.from(student_auth_tag, 'hex'));
                let decrypted = decipher.update(student_encrypted, 'hex', 'utf8');
                decrypted += decipher.final('utf8');

                let msgObj = Object.assign({
                    message: decrypted,
                    created_at: created_at
                })
                msgs.push(msgObj);
                console.table({ DecyrptedMessage: decrypted });
                var msgDecryptionEnd = performance.now();
                } catch (error) {
                console.log(error.message);
                }           
            })
            res.render('./student/index.ejs', {messages: msgs});
        })
}