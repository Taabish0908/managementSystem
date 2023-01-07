
import userModel from '../model/adminModel.js'
import jwt  from 'jsonwebtoken'
// const { default: mongoose } = require('mongoose')
import mongoose from 'mongoose'

class auth{

        authenticate = async function(req, res, next){
        try{
            const token = req.headers['jwttoken']
            // console.log(token);
            const secretKey = "itsasecretdonttellanyone"
    
            if(!token){
            return res.status(400).send({status: false, message : "Please provide token"})
            }
    
            const decodedToken = jwt.verify(token, secretKey) 
    
            if(!decodedToken){
            return res.status(401).send({status : false, message: "authentication failed"})
            }
            // setting a key in request,  "decodedToken" which consist userId and exp.
            req.decodedToken = decodedToken
            
            next()
    
        }catch(err){
           
            res.status(500).send({error : err.message})
        }
    }
    authorise = async function(req, res,next){
        try{
            
            const decodedToken = req.decodedToken
            const userId = decodedToken.userId
            console.log(decodedToken)
           
            
    
            const user = await userModel.findOne({_id : userId})
            console.log(user)
    
            // if(!user){
            // return res.status(404).send({status : false, message : "No user found"})    
            // }
    
            
            if(user.role !== 'admin' && decodedToken.userId ==user._id){
                return res.status(403).send({status: false, message : 'you are not authorised'})
            }
            
            
            next()
    
        }catch(err){
            res.status(500).send({error : err.message})
        }
    }

}
export default new auth()