import { UserDocument } from "./user.interface";
import { Document } from "mongoose";

export interface ProductInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductDocument extends ProductInput, Document {
  createdAt: Date;
  updatedAt: Date;
}
