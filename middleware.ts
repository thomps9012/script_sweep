import { NextFunction, Response, Request } from "express";
import { ERRORS } from "./errors";
import { API_KEY } from "./types";
import * as dotenv from "dotenv";
import * as jose from "jose";
import database from "./db";
dotenv.config();
const { JWT_HEAD_ALG, JWT_HEAD_ENC, JWT_ISSUER, JWT_SECRET } = process.env;
const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, email } = req.headers;
  const email_regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g;
  if (!token || token == "") {
    res.status(403).send(ERRORS.NO_JWT);
    return;
  }
  if (!email || !(email as string).match(email_regex)) {
    res.status(400).send(ERRORS.NO_EMAIL);
    return;
  }
  try {
    const secret = jose.base64url.decode(JWT_SECRET as string);
    const { payload, protectedHeader } = await jose.jwtDecrypt(
      token as string,
      secret,
      {
        issuer: JWT_ISSUER,
        audience: email,
      }
    );
    const { exp, aud, api_key: jwt_api_key, iss, iat } = payload;
    const { alg, enc } = protectedHeader;
    if (alg != JWT_HEAD_ALG || enc != JWT_HEAD_ENC) {
      res.status(403).send(ERRORS.TAMPERED_JWT);
      return;
    }
    if (aud != email || iss != JWT_ISSUER) {
      res.status(403).send(ERRORS.TAMPERED_JWT);
      return;
    }
    if ((exp as number) < (iat as number)) {
      res.status(403).send(ERRORS.TAMPERED_JWT);
      return;
    }
    if ((exp as number) < Date.now()) {
      res.status(403).send(ERRORS.TOKEN_EXPIRED);
      return;
    }
    const { data, error } = await database
      .from("keys")
      .select("requests")
      .eq("api_key", jwt_api_key);
    if (error) {
      res.status(503).send(error);
      return;
    }
    if (data.length == 0) {
      res.status(401).send(ERRORS.KEY_NOT_FOUND);
      return;
    }
    const { requests } = data[0] as unknown as API_KEY;
    if (requests >= 100) {
      res.status(429).send(ERRORS.RATE_LIMIT);
      return;
    }
    const new_request_count = requests + 1;
    const { error: update_error } = await database
      .from("keys")
      .update({ requests: new_request_count })
      .eq("api_key", jwt_api_key);
    if (update_error) {
      res.status(503).send(update_error);
      return;
    } else {
      next();
    }
  } catch (err) {
    res.status(403).send(err);
  }
};
export default authorization;
