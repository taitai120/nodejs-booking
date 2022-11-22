import User from "../models/User.js";

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const newUser = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            status: "success",
            data: {
                newUser,
            },
        });
    } catch (err) {
        next(err);
    }
};
