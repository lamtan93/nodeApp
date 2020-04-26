const express = require('express');
const router = express.Router();

//BMI Template
router.get('/bmi_tpl', (req,res)=>{
    res.render('bmi_tpl');
});


//BMI Service
//users/bmi_calculator?weight=&height=
router.get('/bmi_calculator', async(req, res)=>{
    let params = req.query;
    let result = '';
    if(!params.weight || !params.height){
        res.send('Veuillez compléter les informations !');
    }else{
        let indiceBmi = params.weight/(params.height*params.height);
        console.log('indiceBmi' + indiceBmi);
        if(indiceBmi < 18.5){
            result = 'Ốm';
        }else if(indiceBmi > 18.5 & indiceBmi < 25){
            result  = 'Bình thường';   
        }else if(indiceBmi > 25 && indiceBmi < 30){
            result = 'Béo';    
        }else if(indiceBmi > 30){
            result = 'Béo phì';                
        }
    }

    res.send(`${result}`);
});

//Login template
router.get('/login_tpl', (req,res)=>{
    res.render('login_tpl');
});

//Login template
router.get('/loginSuccess_tpl', (req,res)=>{
    res.render('loginSuccess_tpl');
});

//Login Service
let users = [{'admin': '@123'}, {'bob': '#321'}, {'jane': '@456'}]
router.post('/login', async(req, res)=>{
    let {username = '', password = ''} = req.body;
        const foundUser = users.find(user =>{
            return user[username] === password;   
        });

        if(foundUser){
            res.json({
                result: 'OK',
                message: 'Login OK'
            })
        }else{
            res.json({
                result: 'failed',
                message: 'username or password not correct'
            })    
        }
});


module.exports = router;