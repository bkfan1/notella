import {email} from "../../../utils/regex";

export const validCredentials = async(req, res, next)=>{
    const {body} = req;

    if(!body.email || !body.password){return res.status(401).json({});}
    if(email.test(body.email) && body.password.length >= 8){
        return await next(req, res);
    };
    return res.status(400).json({});

}