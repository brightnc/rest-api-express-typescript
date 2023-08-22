import ProductModel from "../models/product.model";
import { ProductInput } from "../interfaces/product.interface";

export async function createProduct(input: ProductInput) {
  const result = await ProductModel.create(input);
  return result.toJSON();
}
