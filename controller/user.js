import Userdb from "../schema/userSchema.js";

const register = async (req, res) => {
    console.log("hi from backend", req.body);
    try {
        const { name, email, password } = req.body
        console.log(name, email, password);
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'please enter all user details' })
        }
        const userExisting = await Userdb.findOne({ email })
        if (userExisting) {
            return res.status(400).json({ message: 'user already exists' })
        }
        const user = await Userdb.create({
            name: name.trim(),
            email: email,
            password: password 
        })
        res.status(200).json({ message: 'user created', user })

    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    console.log("login controller reached", email, password);
    try {
        const user = await Userdb.findOne({ email })
        if (!email || !password) {
            return res.status(400).json({ message: 'please enter the user details' })
        }
        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'wrong password' })
        }
        req.session.user = {
            id: user._id,
            name:user.name,
            email: user.email
        }
        res.status(200).json({ message: 'login successful', user })
    } catch (error) {
        console.log(error);
    }
}

const authCheck = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: "Not logged in" });
    }
} 

const getProfile = async(req,res)=>{
    console.log();
    
    res.json({ user: req.session.user });
} 

const logout = async(req,res)=>{
    req.session.destroy()
    res.status(200).json({message:"Logged Out"})
}

export {
    register, login, authCheck, getProfile,logout
}