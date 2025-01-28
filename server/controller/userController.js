import { Webhook } from "svix"
import UserModel from "../models/userModels.js"
const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

            const { data, type } = req.body


            switch (type) {
                case "user.created":{
                    const userData = {
                        clerkId: data.id,
                        email: data.email_addresses?.[0]?.email_address || "",
                        firstname: data.first_name || "",
                        lastname: data.last_name || "",
                        photo: data.image_url || "" // Match the schema field
                    };
                    
                    await UserModel.create(userData)
                    res.json({})

                    break;
                }
                case 'user.updated':{
                    const userData = {
                        email: data.email_addresses?.[0]?.email_address || "",
                        firstname: data.first_name || "",
                        lastname: data.last_name || "",
                        photo: data.image_url || "" // Match the schema field
                    };
                    
                   await UserModel.findOneAndUpdate({clerkId: data.id}, userData)
                   res.json({})

                    break;
                }
                case 'user.deleted':{
                    await UserModel.findOneAndDelete({clerkId: data.id})
                    res.json({}) 
                    break;
                }
                default:
                    break;
            }
      
    } catch (error) {
        console.log(error)
        res.json({ success:false, message:error.message})
        
    }
}

export {clerkWebhooks}

