import mongoose, { Schema, Document } from "mongoose";

export interface IMrVisit {
  mrId: mongoose.Types.ObjectId;
  medicineId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  totalAmount: number;                
  date: Date;
}

export interface IMedical extends Document {
  name: string;
  address?: string;
  contact?: string;
  type: "Medical Store" | "Hospital";
  mrVisits: IMrVisit[];
}

const MrVisitSchema = new Schema<IMrVisit>(
  {
    mrId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number },
    totalAmount: { type: Number },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);


MrVisitSchema.pre("save", function (next) {
  this.totalAmount = this.quantity * this.price;
  next();
});

const MedicalSchema = new Schema<IMedical>(
  {
    name: { type: String, required: true },
    address: { type: String },
    contact: { type: String },
    type: { type: String, enum: ["Medical Store", "Hospital"], required: true },
    mrVisits: [MrVisitSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IMedical>("Medical", MedicalSchema);
