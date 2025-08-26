import mongoose, { Document, Schema } from "mongoose";
import { Role } from "../enums/Role";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    profileImage?: string;
    region ?: string;
    role: Role;
    managerId?: mongoose.Types.ObjectId;
    lastLogin?: Date;
    isActive: boolean;
    isDeleted: boolean;
    deletedAt?: Date;
    deletedBy?: mongoose.Types.ObjectId;
    createdBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;

}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    profileImage: { type: String },
    region: { type: String },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.ADMIN,
    },
    managerId: { type: Schema.Types.ObjectId, ref: "User" },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
