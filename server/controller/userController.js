import UserModel from "../models/userModels.js";
import { Webhook } from "svix";

const CreateWebhook = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature']
        });

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    photo: data.image_url
                };
                await UserModel.create(userData);
                return res.status(201).json({ message: 'User created' });
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstname: data.first_name,
                    lastname: data.last_name,
                    photo: data.image_url
                };

                // Check if user exists and update
                const updatedUser = await UserModel.findOneAndUpdate(
                    { clerkId: data.id },
                    userData,
                    { new: true }
                );

                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found for update' });
                }

                return res.json({ message: 'User updated' });
            }

            case 'user.deleted': {
                const deletedUser = await UserModel.deleteOne({ clerkId: data.id });
                if (deletedUser.deletedCount === 0) {
                    return res.status(404).json({ message: 'User not found for deletion' });
                }
                return res.json({ message: 'User deleted' });
            }

            default: {
                console.warn(`Unexpected event type: ${type}`);
                return res.status(400).json({ message: 'Unhandled event type' });
            }
        }
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export { CreateWebhook };
