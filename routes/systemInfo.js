const express = require('express');
const os = require('os');

let router = express.Router();

router.get('/', (req,res)=>{
    res.send('<H1>You called systemInfo</H1>');
});

router.get('/adresse', (req,res)=>{
    //res.send('<H1>Adresse</H1>');
    res.redirect('/systemInfo/chats')
});

router.get('/chats', (req,res)=>{
    res.send('Vous etes dans la maison des chats');
});

module.exports = router;

