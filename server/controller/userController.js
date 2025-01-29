import UserModel from "../models/userModels.js";
import { Webhook } from "svix";



const CreateWebhook = async (req, res) => {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature']
        });

            const { data, type } = req.body


            switch (type) {
                case 'user.created':{
                    const userData = {
                        clerkId: data.id,
                        email: data.email_addresses[0].email_address,
                        firstname: data.first_name,
                        lastname: data.last_name,
                        photo: data.image_url
                    }
                    await UserModel.create(userData)
                    res.json({message: 'User created'})

                    break;
                }
                case 'user.updated':{
                   const userData = {
                       email: data.email_addresses[0].email_address,
                       firstname: data.first_name,
                       lastname: data.last_name,
                       photo: data.image_url
                   }
                   await UserModel.updateOne({clerkId: data.id}, userData)
                   res.json({message: 'User updated'})

                    break;
                }
                case 'user.deleted':{
                    await UserModel.deleteOne({clerkId: data.id})
                    res.json({message: 'User deleted'}) 
                    break;
                }
                default:
                    break;
            }
      
    } catch (error) {
        console.log(error)
        res.json({message: error.message})
        
    }

}




export {CreateWebhook}