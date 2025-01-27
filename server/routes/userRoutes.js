import express from "express";
import handler, {clerkWebhooks} from '../controller/userController.js'
const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhooks);
userRouter.post('hello',handler)
export default userRouter