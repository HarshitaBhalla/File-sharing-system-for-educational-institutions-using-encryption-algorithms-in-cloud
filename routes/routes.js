'use strict'
const express=require('express');
const router=express.Router();
const sendMsg = require("../controllers/sendMsg");
const teacherUpload = require('../controllers/teacherUpload');
const studentDownload = require('../controllers/studentDownload');
const studentPortal = require("../controllers/studentPortal");

router.post('/sendMsg',sendMsg);
router.post('/upload',teacherUpload);
router.post('/download',studentDownload);
router.get('/teacherLogin', (req,res)=>{
    res.render('./teacher/login.ejs');
})
router.get('/studentLogin', (req,res)=>{
    res.render('./student/login.ejs');
})
router.get('/student', studentPortal);
router.get('/teacher',(req,res)=>{
    res.render('./teacher/index.ejs');
})

module.exports =router;