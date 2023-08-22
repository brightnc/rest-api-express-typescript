import { UserDocument } from "./user.interface";
import { Document } from "mongoose";

export interface SessionDocument extends Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}
