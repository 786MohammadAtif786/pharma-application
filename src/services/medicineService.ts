import { Medicine, IMedicine } from "../models/Medicines";

class MedicineService {
  async createMedicine(data: Partial<IMedicine>) {
    const medicine = new Medicine(data);
    return await medicine.save();
  }
  async getAllMedicine(page: number, limit: number, search?: string, brand?: string) {
  //   const query: any = { isDeleted: false }; 
  //    // search by name (case-insensitive)
  // if (search) {
  //   query.name = { $regex: search, $options: "i" };
  // }

  // // filter by brand
  // if (brand) {
  //   query.brand = { $regex: brand, $options: "i" };
  // }

  // const skip = (page - 1) * limit;

  // const medicines = await Medicine.find(query)
  //   .sort({ createdAt: -1 }) // latest first
  //   .skip(skip)
  //   .limit(limit);

  // const total = await Medicine.countDocuments(query);

  // return {
  //   data: medicines,
  //   total,
  //   page,
  //   pages: Math.ceil(total / limit),
  // };
  //   return Medicine.find({ isDeleted: false });
  // }
// medicine.service.ts
// async getMedicines(page: number, limit: number, search?: string, brand?: string) {
  const query: any = { isDeleted: false }; // only active medicines

  // search by name (case-insensitive)
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  // filter by brand
  if (brand) {
    query.brand = { $regex: brand, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const medicines = await Medicine.find(query)
    .sort({ createdAt: -1 }) // latest first
    .skip(skip)
    .limit(limit);

  const total = await Medicine.countDocuments(query);

  return {
    data: medicines,
    total,
    page,
    pages: Math.ceil(total / limit),
  };



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
