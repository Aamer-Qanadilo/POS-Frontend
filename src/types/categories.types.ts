export default interface categories {
  _id: string;
  name: string;
  image: string;
}

export type categoryUploadType = Omit<Omit<categories, "_id">, "image">;
