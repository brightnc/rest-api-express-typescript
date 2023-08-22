import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel from "../models/session.model";
import { SessionDocument } from "../interfaces/session.interface";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent: userAgent,
  });
  return session.toJSON();
}

export async function getSession(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) {
    return "";
  }

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) {
    return "";
  }

  const user = await findUser({ _id: session.user });

  if (!user) {
    return "";
  }

  //create access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("accessTokenExpire") } // 15 minutes
  );

  return accessToken;
}