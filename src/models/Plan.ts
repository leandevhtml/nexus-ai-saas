import mongoose, { Schema, Document } from "mongoose";

export interface IPlan extends Document {
  name: string;
  price: number;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  buttonClass: string;
  popular: boolean;
  priceId?: string;
  active: boolean;
  iconType?: string;
}

const PlanSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    period: { type: String },
    description: { type: String, required: true },
    features: [{ type: String }],
    cta: { type: String, required: true },
    buttonClass: { type: String, required: true },
    popular: { type: Boolean, default: false },
    priceId: { type: String },
    active: { type: Boolean, default: true },
    iconType: { type: String, default: "zap" },
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model<IPlan>("Plan", PlanSchema);
