import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
//import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body); // call create user service
    return res.status(201).json(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).json({ message: e.message });
  }
}
