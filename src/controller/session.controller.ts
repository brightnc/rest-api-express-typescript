import { Request, Response } from "express";
import {
  createSession,
  getSession,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import "dotenv/config";

export async function createUserSessionHandler(req: Request, res: Response) {
  //Validate user password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  //create session

  const session = await createSession(user._id, req.get("user-agent") || "");

  //create access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    //{expiresIn: config.get<string>("accessTokenExpire")} // 15 minutes
    { expiresIn: process.env.ACC_TOKEN_EXPIRE as string }
  );
  //create refresh token

  const refreshToken = signJwt(
    { ...user, session: session._id },
    //{ expiresIn: config.get<string>("refreshTokenExpire") } // 1 year
    { expiresIn: process.env.REF_TOKEN_EXPIRE as string }
  );

  //return access & refresh token

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await getSession({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
