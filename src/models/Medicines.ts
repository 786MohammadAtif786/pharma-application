import mongoose, { Document, Schema } from "mongoose";

export interface IMedicine extends Document {
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  batchNo: string;
  manufactureDate: Date;
  expiryDate: Date;
  minimumStockLevel: number;
  images: string[];
  tags: string[];
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  deletedBy?: mongoose.Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const medicineSchema = new Schema<IMedicine>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    unit: { type: String, required: true },
    batchNo: { type: String, required: true },
    manufactureDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    minimumStockLevel: { type: Number, default: 0 },
    images: [{ type: String }],
    tags: [{ type: String }],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export const Medicine = mongoose.model<IMedicine>("Medicines", medicineSchema);
