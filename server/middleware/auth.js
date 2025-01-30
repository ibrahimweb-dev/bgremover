import jwt from "jsonwebtoken";


const auth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false,  message: "Unauthorized" });

        }

        const token_decode = jwt.decode(token);
        req.body.clerkId = token_decode.clerkId;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
        
    }
}

export default auth