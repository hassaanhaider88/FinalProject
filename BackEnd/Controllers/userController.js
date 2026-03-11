import userModel from "../Models/UserModel.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check fields
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Email and Password required"
            });
        }

        // find user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15d" }
        );

        return res.json({
            success: true,
            message: "Login Successful",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check for all fields
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "All Fields Required.."
            })
        }
        // check for existing user
        const isExist = await userModel.findOne({ email: email });
        if (isExist) {
            return res.json({
                success: false,
                message: "User Email Exist .."
            })
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        // create user
        const User = await userModel.create({
            name,
            email,
            password: hashpassword,
        });

        if (!User) {
            return res.json({
                success: false,
                message: "Something wents wrong .."
            })
        };

        const token = jwt.sign(
            {
                userId: User._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15d"
            }
        );
        console.log(token)
        return res.json({
            success: true,
            message: "User Created SuccessFully..",
            data: User,
            token
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
};

const LoggedUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.json({
                success: false,
                message: "Please login again.."
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await userModel.findById(decode.userId).select("-password");
        if (!userData) {
            return res.json({
                success: false,
                message: "Please login again.."
            })
        }
        return res.json({
            success: true,
            message: "fetch user successfully..",
            data: userData
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}
export { LoginUser, RegisterUser, LoggedUser };