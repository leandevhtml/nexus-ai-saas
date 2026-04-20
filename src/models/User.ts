import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String }, // For credentials provider
  image: { type: String },
  emailVerified: { type: Date },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  },
  subscription: {
    plan: { type: String, default: "free" }, // free, pro, enterprise
    status: { type: String, default: "active" }, // active, canceled, past_due
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
