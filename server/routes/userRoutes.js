import express from 'express'
import { CreateWebhook, userCredit } from '../controller/userController.js'
import auth from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/webhooks',CreateWebhook)
userRouter.get('/credits',auth,userCredit)


export default userRouter