import mongoose, { Schema } from "mongoose";

export interface Iuser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  password: string;
  email: string;
}

const userSchema = new Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<Iuser>("user", userSchema);

export default userModel;
