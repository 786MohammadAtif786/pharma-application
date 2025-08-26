
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { Role } from "../enums/Role";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  profileImage?: string;
  region?: string;
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
  isFirstLogin?: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String },
    address: { type: String },
    profileImage: { type: String },
    region: { type: String },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.MR,
    },
    managerId: { type: Schema.Types.ObjectId, ref: "User" },
    lastLogin: { type: Date },
    isFirstLogin: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set("toJSON", {
  transform: function (_doc: any, ret: any) {
    delete ret.password;
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
