import Medical, { IMedical } from "../models/MedicalStore";
import mongoose from "mongoose";

export const medicalService = {
  async createMedical(data: Partial<IMedical>) {
    const medical = new Medical(data);
    return await medical.save();
  },

  async getAll() {
    return await Medical.find();
  },

  async getById(id: string) {
    return await Medical.findById(id);
  },

  async addMrVisit(
    medicalId: string,
    visitData: {
      mrId: string;
      medicineId: string;
      quantity: number;
      pricePerUnit: number;
      date?: Date;
    }
  ) {
    const medical = await Medical.findById(medicalId);
    if (!medical) throw new Error("Medical store/hospital not found");

    const totalAmount = visitData.quantity * visitData.pricePerUnit;

    medical.mrVisits.push({
      ...visitData,
      totalAmount,
    } as any);

    await medical.save();
    return medical;
  },
};
