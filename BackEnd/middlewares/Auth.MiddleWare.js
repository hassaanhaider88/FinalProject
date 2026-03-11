import JWT from 'jsonwebtoken';
import UserModel from "../Models/userModel.js"


const AuthMiddleWare = async (req, res, next) => {
    try {
        // const token = || req.cookie;
        const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
        console.log(token)
        if (!token) {
            return res.json({
                success: false,
                message: "Please Login again.."
            })
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.json({
                success: false,
                message: "Please Login again.."
            })
        }
        const getUser = await UserModel.findById(decode.userId);
        if (!getUser) {
            return res.json({
                success: false,
                message: "Please Login again.."
            })
        }
        req.user = getUser;
        next()
    } catch (error) {
        console.log('somethig wrong in auth mw');
        return res.json({
            success: false,
            message: "Please Login again.."
        })
    }
}

export default AuthMiddleWare;