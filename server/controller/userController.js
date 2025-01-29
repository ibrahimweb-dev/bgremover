import UserModel from "../models/userModels.js";
import { Webhook } from "svix";

const CreateWebhook = async (req, res) => {
    try {
        console.log("📩 Received Webhook Request");

        if (!process.env.CLERK_WEBHOOK_SECRET) {
            console.error("❌ CLERK_WEBHOOK_SECRET is missing!");
            return res.status(500).json({ message: "Server misconfiguration" });
        }

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        console.log("🔍 Verifying webhook...");
        whook.verify(JSON.stringify(req.body), headers);

        console.log("✅ Webhook verified successfully!");

        // Respond immediately
        res.status(200).json({ message: "Webhook received, processing in background" });

        const { data, type } = req.body;
        console.log(`🛠 Processing event: ${type}`);
        console.log("📌 Data received:", JSON.stringify(data, null, 2));

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    photo: data.image_url,
                };

                console.log("📝 Saving new user to database:", userData);
                const newUser = await UserModel.create(userData);
                console.log("✅ User saved successfully:", newUser);
                break;
            }

            case "user.updated": {
                const updatedData = {
                    email: data.email_addresses[0].email_address,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    photo: data.image_url,
                };

                console.log("🛠 Updating user:", updatedData);
                const updatedUser = await UserModel.updateOne({ clerkId: data.id }, updatedData);
                console.log("✅ User updated:", updatedUser);
                break;
            }

            case "user.deleted": {
                console.log("🗑 Deleting user with clerkId:", data.id);
                const deletedUser = await UserModel.deleteOne({ clerkId: data.id });
                console.log("✅ User deleted:", deletedUser);
                break;
            }

            default:
                console.log("⚠️ Unhandled webhook event type:", type);
                break;
        }
    } catch (error) {
        console.error("❌ Webhook Processing Error:", error);
    }
};

export { CreateWebhook };
