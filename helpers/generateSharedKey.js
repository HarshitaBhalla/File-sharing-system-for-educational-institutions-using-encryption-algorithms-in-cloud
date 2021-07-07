'use strict'
const crypto = require('crypto');
const {performance} = require('perf_hooks');

console.log("Using Elliptic Curve Diffie Hellman")
  console.log("");

var teacherKeyGenerationStart = performance.now();
const teacher = crypto.createECDH('secp256k1');
teacher.generateKeys();
var teacherKeyGenerationEnd = performance.now();
console.log(`time taken for 256 bit teacher key generation: ${teacherKeyGenerationEnd - teacherKeyGenerationStart} ms`);

var studentKeyGenerationStart = performance.now();
const student = crypto.createECDH('secp256k1');
student.generateKeys();
var studentKeyGenerationEnd = performance.now();
console.log(`time taken for 256 bit student key generation: ${studentKeyGenerationEnd - studentKeyGenerationStart} ms`);



const teacherPublicKeyBase64 = teacher.getPublicKey().toString('base64');
const studentPublicKeyBase64 = student.getPublicKey().toString('base64');

var teacherSharedKeyCalculationStart = performance.now();
const teacherSharedKey = teacher.computeSecret(studentPublicKeyBase64, 'base64', 'hex');
var teacherSharedKeyCalculationEnd = performance.now();
console.log(`time taken for shared key calculation at teacher end: ${teacherSharedKeyCalculationEnd - teacherSharedKeyCalculationStart} ms`);

var studentSharedKeyCalculationStart = performance.now();
const studentSharedKey = student.computeSecret(teacherPublicKeyBase64, 'base64', 'hex');
var studentSharedKeyCalculationEnd = performance.now();
console.log(`time taken for shared key calculation at student end: ${studentSharedKeyCalculationEnd - studentSharedKeyCalculationStart} ms`);


console.log(teacherSharedKey === studentSharedKey);
console.log('Teacher shared Key: ', teacherSharedKey);
console.log('Student shared Key: ', studentSharedKey);