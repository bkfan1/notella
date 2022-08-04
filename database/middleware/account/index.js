import connection from "../../connection";
import Account from "../../models/account";


export const getAccountNotes = async (req, res, userId)=>{
    const db = await connection();
    const user =await Account.findOne({_id: userId});
    if(user){
        return res.status(200).json({notes: user.notes, trashedNotes: user.trashedNotes})
    }
    return res.status(404).json({});
}

export const updateAccountNotes = async(req, res, userId)=>{
    const db = await connection();
    const {body} = req;
    const filter = {_id: userId};
    const update = {notes: body.notes, trashedNotes: body.trashedNotes}
    const user = await Account.findOneAndUpdate(filter, update, {new:true});
    return res.status(200).json({notes:user.notes, trashedNotes: user.trashedNotes})

}

