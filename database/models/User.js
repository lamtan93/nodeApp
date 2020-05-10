const {mongoose} = require('../connectDatabase');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const {sendEmail} = require('../../util/mail_util');

const UserSchema = new Schema({
    name: {type: String, default: 'unknown', unique: true},
    email: {type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique: true},
    password: {type: String, require: true},
    active: {type: Number, default: 0}
});

//Chuyen User schema sang Model
const User = mongoose.model('User', UserSchema);

//Insert a new User:
const insertUser = async (name, email, password)=>{
    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        let user = new User();
        user.name = name;
        user.email = email;
        user.password = encryptedPassword;
        await user.save();
        //Gửi email yêu cầu activate sau khi đang kí
        await sendEmail(user.email, encryptedPassword);
        console.log(`[insertUser] OK : ${user}`)
    } catch (error) {
        throw error;
        //console.log(`[insertUser]erreur : ${error}`);
    }
};

//Activate User by GET request in the mail
const activateUser = async (email, secretKey) =>{
    try {
        let foundUser = await User.findOne({
            email, //email: email
            password: secretKey
        });

        if(!foundUser){
            throw 'Không tìm thấy User để kích hoạt';
        }else{
            if(foundUser.active === 0){
                foundUser.active = 1;
                await foundUser.save();
            }else{
                throw 'User đã kích hoạt';
            }
        }
    } catch (error) {
        throw error;
    }
};



module.exports = {
    User,
    insertUser,
    activateUser
}



