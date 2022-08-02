import { connect } from "mongoose";

export default async function connection(){
    return connect(process.env.MONGODB_URI);
}