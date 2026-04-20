import mongoose, { Schema, Document } from "mongoose";

export interface IHistory extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  prompt: string;
  result: string;
  createdAt: Date;
}

const HistorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true, default: "Texto" },
    prompt: { type: String, required: true },
    result: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.History || mongoose.model<IHistory>("History", HistorySchema);
