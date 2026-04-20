import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  nome: string;
  email: string;
  data_de_inscricao: Date;
  origem_da_campanha: string;
}

const LeadSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    data_de_inscricao: {
      type: Date,
      default: Date.now,
    },
    origem_da_campanha: {
      type: String,
      default: "landing-page",
      enum: ["landing-page", "social", "referral", "ads", "other"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
