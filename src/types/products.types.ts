export default interface products {
  _id: string;
  name: string;
  code: string;
  category: {
    _id: string;
    name: string;
    image: string;
  };
  image: string;
  price: number;
  unitOfMeasure: {
    _id: string;
    name: string;
    baseUnit: string;
    conversionFactor: number;
  };
}
