import flatModel from "../model/flatModel.js";
import uploadService from '../services/uploadService.js'

class flatController{

    async createFlat(req,res){

        let body = req.body
        let {flatName,image,title,flatAddedBy,status,occupiedBy}= body
        var path
        if(req.file){
            const name = req.file.originalname
           
             path = await uploadService.uploadFile(req,'flat',name);
             console.log(path);
        }
        let flatData = {
            flatName,
            image:path,
            title,
            flatAddedBy,
            status,
            occupiedBy
        }
        const data = await flatModel.create(flatData)
        res.status(201).send(data)

    }
    async getFlat(req,res){
        try {
            
            let flat =  await flatModel.find().populate(['flatAddedBy','occupiedBy'])
            console.log(flat)
            return res.status(200).send(flat)
        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }
    }
    async updateFlat(req,res){
        try {
            let data= req.body
            let flatId = req.params.flatId
        // let {flatName,image,title,flatAddedBy,status,occupiedBy}= body
        var path
        if(req.file){
            const name = req.file.originalname
           
             path = await uploadService.uploadFile(req,'flat',name);
        }
        let flatToBeUpdated = await flatModel.findById(flatId)
        // console.log(flatToBeUpdated);
        if(!flatToBeUpdated){
            return res.status(400).send({
                status:false, message:'the requested flat not found'
            })
        }
        else{
            let updateFlatData = await flatModel.findByIdAndUpdate({_id:flatId},
                {flatName:data.flatName,image:path,title:data.title,status:data.status,occupiedBy:data.occupiedBy},
                {new:true})

            return res.status(201).send({
                status:true,
                message:'data updated',
                data:updateFlatData
            })

        }

        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }
    }

    async deleteFlat(req,res){
        try {
            
            let flatId = req.params.flatId

            let flatToBeDeleted = await flatModel.findById(flatId)
            if(!flatToBeDeleted){
                return res.status(400).send({
                    status:false,
                    message:'No flat found with the given id'
                })
            }
            if(flatToBeDeleted.isDeleted == true){
                return res.status().send({
                    status:false,
                    message:'the flat is already deleted'
                })
            }

            let deleteFlat = await flatModel.findByIdAndUpdate({_id:flatId},{ $set: { isDeleted: true, deletedAt: Date.now() } })
            return res.status(200).send({ 
                Status: true, 
                message: "Requested flat has been deleted." 
            })

        } catch (error) {
            res.status(500).send({status:false,message:error.message})
        }
    }

}
export default new flatController()