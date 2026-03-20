import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bycrpt, { hash } from "bcrypt";

const login = async (req,res) =>{
 const {username, password}= req.body;

   if(!username || !password){
     res.status(400).json({message: "please provide "});
   }

    try{
       const user = await User.find({username});
       if(!user){
        res.status(httpStatus.NOT_FOUND).json({message :"provide valide "});
       }

       if(bcrypt.compare(password, user.password)){
        let token = crypto.randomBytes(20).toString("hex");
        user.token= token;
        await user.save();
        res.status(httpStatus.OK).json({token : "token"})
       }

    }catch(e){
        return res.status(500).json({message :"something went wrong "})
    }
}

const Register= async (req, res) =>{
    const {name, username, password}= req.body;

    try{
       const existingtUser =await User.findOne({username});
       if(existingtUser){
        return res.status(httpStatus.FOUND).json({message : `user exist already`});

       }
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({
        name :name,
        username: username,
        password:hashedPassword
       });

       await newUser.save();
       res.status(httpStatus.CREATED).json({message: `user registered`});

    }catch(e){
   res.json({message : `something is wrong ${e}`});
    }
}

export {login , Register}