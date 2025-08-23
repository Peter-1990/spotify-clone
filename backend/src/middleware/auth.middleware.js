import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    // Use req.auth() to get the userId
    const userId = req.auth().userId // Call req.auth() as a function

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized - you must be logged in" });
    }
    next();
};

export const requireAdmin = async (req, res, next) => {
    try {
        // Use req.auth() to get the userId
        const userId = req.auth().userId // Call req.auth() as a function
        const currentUser  = await clerkClient.users.getUser (userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser .primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized - you must be an admin" });
        }
        next();
    } catch (error) {
        next(error);
    }
};
