import { Schema, model, models } from "mongoose";

const accountSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: String },

    notes: { type: Array },
    trashedNotes: { type: Array },
  },
  { collection: "accounts" }
);

export default models.Account || model("Account", accountSchema);
