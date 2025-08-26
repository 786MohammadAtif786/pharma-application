import { Medicine, IMedicine } from "../models/Medicines";

class MedicineService {
  async createMedicine(data: Partial<IMedicine>) {
    const medicine = new Medicine(data);
    return await medicine.save();
  }
  async getAllMedicine() {
    return Medicine.find({ isDeleted: false });
  }

  async getMedicineById(id: string) {
    return Medicine.findOne({ _id: id, isDeleted: false });
  }

  async updateMedicine(id: string, data: Partial<IMedicine>, userId: string) {
    return Medicine.findByIdAndUpdate(
      id,
      { ...data, updatedBy: userId },
      { new: true }
    );
  }

  async deleteMedicine(id: string, userId: string) {
    return Medicine.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date(), deletedBy: userId },
      { new: true }
    );
  }
}

export const medicineService = new MedicineService();
