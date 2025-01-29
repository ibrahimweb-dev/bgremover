import express from 'express'
import { CreateWebhook } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post('/webhooks',CreateWebhook)



export default userRouter