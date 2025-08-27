import Medical, { IMedical } from "../models/MedicalStore";
import mongoose from "mongoose";
// import Medicine from "../models/Medicines";
import { Medicine, IMedicine } from "../models/Medicines";


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
      date?: Date;
    }
  ) {
    const medical = await Medical.findById(medicalId);
    if (!medical) throw new Error("Medical store/hospital not found");

      const medicine = await Medicine.findById(visitData.medicineId);
      if (!medicine) throw new Error("Medicine not found");

      // stock check
    if (medicine.stock < visitData.quantity) {
        throw new Error("Not enough stock available");
    }
    // const totalAmount = visitData.quantity * visitData.pricePerUnit;
    const price = medicine.price;
    
    const totalAmount = visitData.quantity * price;

    medical.mrVisits.push({
      ...visitData,
      price,
      totalAmount,
    } as any);

     // stock reduce
    medicine.stock -= visitData.quantity;
    await medicine.save();


    await medical.save();
    return medical;
  },
};
