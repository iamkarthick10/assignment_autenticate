const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.Login = async (req,res)=>{
 
    let {email,password} = req.body;
    let token = '';
    //Finding user in DB
     await User.findOne({email}, (err, user)=>{
        if(err || !user){
            return res.status(400).json({status: "User Not found",message: "User with the email does not exist. please SignUp"})
        }
        bcrypt.compare(password, user.password,(err,result) => {
            if(result) {
                let payload = {user : user.email};
                try {
                   token =  jwt.sign(payload,'shhhh',{expiresIn:'2d'});
                   return res.status(200).json({status : "Login Success", message : token})
                }
                catch(e) {
                    return res.status(400).json({status: "JWT Failed", message : "Check the code"})

                }
                


                
            }
            else {
                return res.status(400).json({status: "Password doesnt match",message :"Please check your password again"})
            }
        })
    
    })}

 exports.Signup = async (req,res)=>{
    console.log(req.body);

    const {password} = req.body;
    
    let salt = await bcrypt.genSalt(10);
    hashedpassword = await bcrypt.hash(password,salt);
    req.body.password = hashedpassword;

    const newUser = new User(req.body);

    await newUser.save((err, user)=>{
        if(err) {
            return res.status(400).json({message: "User Already exist"})
        }

      return res.status(200).json(user)
    }
    )
    
}