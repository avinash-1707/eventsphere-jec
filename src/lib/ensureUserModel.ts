import mongoose, { Schema } from "mongoose";

export const ensureUserModel = () => {
  if (!mongoose.modelNames().includes("User")) {
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

    const UserSchema = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      department: {
        type: String,
        enum: departments,
        required: true,
      },
      isAdmin: { type: Boolean, default: false },
    });

    mongoose.model("User", UserSchema);
  }
};
