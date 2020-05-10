const express = require('express');
const router = express.Router();
const {insertUser, activateUser} = require('../database/models/User');
const {sendEmail} = require('../util/mail_util');
//BMI Template
router.get('/bmi_tpl', (req,res)=>{
    res.render('bmi_tpl');
});


//BMI Service
//users/bmi_calculator?weight=&height=
router.get('/bmi_calculator', async(req, res)=>{
    let params = req.query;
    let result = '';

    let weightFloat = parseFloat(params.weight);
    let heightFloat = parseFloat(params.height);

    if( !weightFloat || !heightFloat){
        res.json({
            'statut' : 'KO',
            'data': 'Nhập thông tin giùm cái được không ?',
            'type': '0'
        })
    }else{
        let indiceBmi = weightFloat/(heightFloat*heightFloat);
        
        if(indiceBmi < 18.5){
            result = {
                'statut': 'OK',
                'data': 'Ốm quá ăn nhiều vô dùm cái ! -.-',
                'type': '1'
            } 
        }else if(indiceBmi > 18.5 & indiceBmi < 25){
            result = {
                'statut': 'OK',
                'data': 'Bình thường, nhưng cũng đừng chủ quan nhé ! >.^',
                'type': '2'
            } 
        }else if(indiceBmi > 25 && indiceBmi < 30){
            result = {
                'statut': 'OK',
                'data': 'Béo như LỢN, giảm cân đi ! >.<',   
                'type': '3'
            }
        }else if(indiceBmi > 30){
            result = {
                'statut': 'OK',
                'data': 'Béo phì dồi làng nước ơi ! :(',   
                'type': '4'
            }                
        }
        res.json(result);
    }

    
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

//Register User:
router.post('/registerUser', async (req, res)=>{
    let {name, email, password} = req.body;
    try {
        await insertUser(name, email, password);
        res.json({
            result: 'OK',
            message: 'Đăng kí user thành công, bạn cẩn mở mail để kích hoạt'
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể đăng kí thêm user, lỗi ${error}`
        })
    }
});

//Active user controller
// 'localhost:8080/users/activeUser?email=&keySecret=
router.get('/activateUser', async (req, res)=>{
    let {email, secretKey} = req.query;
    try {
        await activateUser(email, secretKey);
        res.send('<h1 style="color:MediumSeaGreen;">Kích hoạt User thành công</h1>')
    } catch (error) {
        res.send(`<h1 style="color:Red;">Không kích hoạt được User </h1>,
        lỗi: ${error}`)
    }
});



module.exports = router;