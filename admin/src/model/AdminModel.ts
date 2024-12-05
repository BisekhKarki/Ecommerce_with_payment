import mongoose, { Schema, Document } from "mongoose";

// Admin interface definition
export interface Admin extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

const AdminSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite
const AdminModel =
  mongoose.models.Admin || mongoose.model<Admin>("Admin", AdminSchema);

export default AdminModel;
