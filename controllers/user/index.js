  
const User = require('../../models/User');


const userController = {
    login:async(req,res)=>{
        res.status(200).send({
            status:true,
            message:'logged in  successfully',
        });
    },
    register:async(req,res)=>{
        try{
        const {name, email, phone, password}=req.body;
        const user = new User({
            name,
            email,
            password,
            phone
        });
        const result =await user.save();
        res.status(200).send({
            status:true,
            message:'registered successfully',
            result:result
        });

        }catch(err){
            res.status(400).send({
                status:false,
                message:"Error"+ err.message,
            })
        }
        
    },
}

module.exports = userController; 