import jwt from "jsonwebtoken";
//import config from "config";
import "dotenv/config";

//const privateKey = config.get<string>("privateKey")
//const publicKey = config.get<string>("publicKey")

const privateKey = process.env.PRIVATE_KEY as string;
const publicKey = process.env.PUBLICKEY as string;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);

    return {
      valid: true,
      expired: false,
      decoded: decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
