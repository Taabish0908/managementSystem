
import express from 'express'
const router = express.Router();

import adminController from '../controller/adminController.js';

import userController from '../controller/userController.js';
import flatController from '../controller/flatController.js'
import upload from '../multerConfig.js'
const flatImage = upload.single('image',5)


import auth from '../middleware/auth.js';

router.post('/register',adminController.register)
router.post('/login',adminController.login)
router.post('/userRegister',userController.register)
router.post('/createFlat',auth.authenticate,auth.authorise,flatImage,flatController.createFlat)
router.get('/getFlat',auth.authenticate,flatController.getFlat)
router.put('/flat/:flatId',auth.authenticate,auth.authorise,flatImage,flatController.updateFlat)
router.delete('/flat/:flatId',auth.authenticate,auth.authorise,flatController.deleteFlat)




export default router