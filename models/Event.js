import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  capacity: Number,
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  approved: { type: Boolean, default: false }
});

export default mongoose.model("Event", eventSchema);
