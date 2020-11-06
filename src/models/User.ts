import { Schema, model, Model, Document } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  heroId: {
    type: Number,
    required: true
  },
  heroName: {
    type: String,
    required: true
  }
});

interface User extends Document {
  email: string;
  password: string;
  heroId: number;
  heroName: string;
}

const User: Model<User> = model("User", userSchema);

export default User;
