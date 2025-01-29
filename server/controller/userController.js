import { Webhook } from "svix";
import UserModel from "../models/userModels.js";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Convert raw body to a string
        const payload = req.body.toString('utf8');

        // Verify the webhook
        whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { data, type } = JSON.parse(payload);

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    firstname: data.first_name || "",
                    lastname: data.last_name || "",
                    photo: data.image_url || "",
                };
                await UserModel.create(userData);
                res.status(201).json({ success: true, message: "User created" });
                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses?.[0]?.email_address || "",
                    firstname: data.first_name || "",
                    lastname: data.last_name || "",
                    photo: data.image_url || "",
                };
                await UserModel.findOneAndUpdate({ clerkId: data.id }, userData);
                res.status(200).json({ success: true, message: "User updated" });
                break;
            }
            case "user.deleted": {
                await UserModel.findOneAndDelete({ clerkId: data.id });
                res.status(200).json({ success: true, message: "User deleted" });
                break;
            }
            default:
                res.status(400).json({ success: false, message: "Unhandled event type" });
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export { clerkWebhooks };