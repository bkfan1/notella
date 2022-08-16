import { connect } from "mongoose";

export default async function connection() {
  try {
    return await connect(process.env.MONGODB_URI);
  } catch (error) {
    throw Error("Error while attempting to connect to database.");
  }
}
