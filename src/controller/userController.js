import userModel from "../model/userModel.js";
import validator from "../validator/validator.js";
import jwt from 'jsonwebtoken'

class userController{

    async register(req,res){
        try {
            const data = req.body;
            let {name,role,email,phone,addedFlat} = data
            
            if(!validator.isValid(name)){
                return res.status(400).send({staus:false,message:'name is required'})
            }
            if(!validator.isValid(role)){
                return res.status(400).send({staus:false,message:'role is required,'})
            }
            if(!validator.isValid(email)){
                return res.status(400).send({staus:false,message:'email is required'})
            }
            if(!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email)) {
                return res.status(400).send({ 
                    status: false, 
                    message: "Please provide a valid email"
                 });
            }

            if(!validator.isValid(phone)){
                return res.status(400).send({status:false,message:'phone no is required'})
            }

            let isMailAlreadyExist = await userModel.findOne({email:data.email})
            if(isMailAlreadyExist){
                return res.status(400).send({
                    status:false,
                    message:'this mail is already registered'
                })
            }

            let isPhoneAlreadyExist  = await userModel.findOne({phone:data.phone})
            if(isPhoneAlreadyExist){
                return res.status(400).send({
                    status:false,
                    message:'this phone number is already in use'
                })
            }

            const userData = {
                name,
                role,
                email,
                phone,
                addedFlat
                
            }
            const createdUser = await userModel.create(userData);
            return res.status(200).send({status:true,message:'user creataed successfully',data:createdUser})

        } catch (error) {
            res.status(500).send({ status: false, message: error.message })
        }
    }

    async login(req,res){

        try {
            
            const data = req.body;
            let {email,phone} = data

            if(!validator.isValid(email)){
                return res.status(400).send({status:false,message:'please enter the valid mail id'})
            }
            if(!validator.isValid(phone)){
                return res.status(400).send({status:false,message:'please enter the valid phone number'})
            }

            let foundUser =  await userModel.findOne({email:data.email,phone:data.phone})
            if(!foundUser){
                return res.status(400).send({
                    staus:false,
                    error:'email or phone is not correct'
                })
            }
            const userID = foundUser._id
            const payLoad = { userId: userID }
            const secretKey = "itsasecretdonttellanyone"
    
            // creating JWT
    
            const token = jwt.sign(payLoad, secretKey, { expiresIn: "10hr" })
    
            res.header("jwttoken", token)
    
            res.status(200).send({ 
                status: true, 
                message: "login successful", data: token 
            })

        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }

    }


}
export default new userController()