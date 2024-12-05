import mongoose, { Schema } from "mongoose";

export interface Users extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema<Users> = new Schema(
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
      required: false,
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.Users as mongoose.Model<Users>) ||
  mongoose.model("Users", UserSchema);

export default UserModel;
