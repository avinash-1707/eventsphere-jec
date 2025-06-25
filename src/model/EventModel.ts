import mongoose, { Document, Schema } from "mongoose";
import { User } from "./UserModel";

export interface Event extends Document {
  bannerUrl: string;
  ename: string;
  datetime: Date;
  description: string;
  registrations: User[];
}

const EventSchema: Schema<Event> = new Schema({
  bannerUrl: { type: String },
  ename: { type: String, required: true },
  datetime: { type: Date, required: true, default: Date.now() },
  description: {
    type: String,
    required: true,
    min: [10, "The description should be more than 10 words"],
  },
  registrations: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
});

const EventModel =
  (mongoose.models.Event as mongoose.Model<Event>) ||
  mongoose.model<Event>("Event", EventSchema);

export default EventModel;
