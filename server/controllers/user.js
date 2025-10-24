import User from '../models/User.js';


const postSignup = async (req, res) => {
    const {name, email, password} = req.body;

    const nameValidateRegex = /^[a-zA-Z\s]{3,30}$/;
    const emailValidateRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordValidateRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }  

    if(!nameValidateRegex.test(name)) {
        return res.status(400).json({
            success: false,
            message: "Name must be 3-30 characters long and contain only letters and spaces",
        });
    }
    if(!emailValidateRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format",
        });
    }
    if(!passwordValidateRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long and contain at least one letter and one number",
        });
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success: false,
            message: `User with email ${email} already exists`,
        });
    }

    const newUser = new User({name, email, password});
    const savedUser = await newUser.save();
    res.json({
        success: true, 
        message: "User registered succesfully",
        user: savedUser,
    })
}

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    const existingUser = await User.findOne({ email, password });
    if (existingUser) {
        return res.status(400).json({
            success: true,
            message: "User logged in successfully",
            user: existingUser,
        });
    }   else {      
        return res.status(400).json({
            success: false, 
            message: "Invalid email or password",
        });
    } 

}

export { postSignup, postLogin };