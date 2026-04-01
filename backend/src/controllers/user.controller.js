import { User } from "../models/user.model.js"

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        /** Basic Validations */
        if (!username || !password || !email) {
            return res.status(400).json({
                message: "All fields are important!!"
            })
        }

        /* Check if user already exists with the same email */
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({
                message: "User already exists with this email!!"
            });
        }

        /* Create new user */
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
        });

        res.status(201).json({
            message: "User created successfully!!",
            user: { id: user._id, email: user.email, username: user.username }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const loginUser = async (req, res) => {
    try{
        /* checking if the user already exists with the email provided */
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            message: "User not found"
        });

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    }catch(error){
        res.status(500).json({
            message: "Internal Server Error",
        });
}
}

const logOutUser = async (req, res) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(400).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout successful",
        });

    }catch(error){
        res.status(500).json({
            message: "Internal Server Error", error
        });

    }
}


export {
    registerUser,
    loginUser, 
    logOutUser
}
