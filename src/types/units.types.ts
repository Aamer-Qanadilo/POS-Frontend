export default interface units {
  _id: string;
  name: string;
  baseUnit: string;
  conversionFactor: number;
}

export type unitUploadType = Omit<units, "_id">;
