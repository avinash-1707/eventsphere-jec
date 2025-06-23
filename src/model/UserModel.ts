import mongoose, { Schema, Document } from "mongoose";

const departments = [
  "Computer Science",
  "Information Technology",
  "Artificial intelligence & DS",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Industrial Production",
] as const;

export type Department = (typeof departments)[number];

export interface User extends Document {
  name: string;
  department: Department;
  isAdmin: boolean;
}

const UserSchema: Schema<User> = new Schema({
  name: { type: String, required: true },
  department: {
    type: String,
    enum: departments,
    required: true,
  },
  isAdmin: { type: Boolean, default: false },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
