import UserModel from "../models/userModels.js";
import { Webhook } from "svix";

const CreateWebhook = async (req, res) => {
    try {
        // Ensure Clerk Webhook Secret is defined
        if (!process.env.CLERK_WEBHOOK_SECRET) {
            console.error("CLERK_WEBHOOK_SECRET is missing!");
            return res.status(500).json({ message: "Server misconfiguration" });
        }

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Extract and log headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        console.log("Received Webhook Headers:", headers);

        // Verify webhook signature
        whook.verify(JSON.stringify(req.body), headers);

        // Send response immediately to avoid timeout
        res.status(200).json({ message: "Webhook received, processing in background" });

        // Extract payload data
        const { data, type } = req.body;
        console.log(`Processing Webhook Event: ${type}`);

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    photo: data.image_url,
                };

                await UserModel.create(userData);
                console.log("✅ User created:", userData);
                break;
            }

            case "user.updated": {
                const updatedData = {
                    email: data.email_addresses[0].email_address,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    photo: data.image_url,
                };

                await UserModel.updateOne({ clerkId: data.id }, updatedData);
                console.log("✅ User updated:", updatedData);
                break;
            }

            case "user.deleted": {
                await UserModel.deleteOne({ clerkId: data.id });
                console.log("✅ User deleted:", data.id);
                break;
            }

            default:
                console.log("⚠️ Unhandled webhook event type:", type);
                break;
        }
    } catch (error) {
        console.error("❌ Webhook Error:", error);
    }
};

export { CreateWebhook };
