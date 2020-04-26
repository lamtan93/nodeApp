const express = require('express');
const router = express.Router();
const fs = require('fs');
//Transformer les callback en promises
const promisify = require('util').promisify;
const readdir = promisify(fs.readdir); // get file/folder
const ls = promisify(fs.lstat); //lstat = list status
const path = require('path');

router.get('/', async (req, res)=>{
    
    try {
        const repertoireActuel = path.join(__dirname);
        const files = await readdir(repertoireActuel);

        files.forEach((file)=>{
            const stat =  ls(repertoireActuel + '/' + file);
            if(stat.isFile){
                console.log('isFile:' + file);                
            }else{
                console.log('isFolder:' + file);                    
            }
        });

        
        
        res.send(files);
        debugger
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;