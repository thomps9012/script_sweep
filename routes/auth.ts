import { randomBytes } from "crypto";
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { API_KEY } from "../types";
import { ERRORS } from "../errors";
import * as jose from "jose";
import * as dotenv from "dotenv";
import database from "../db";
dotenv.config();
const auth = express.Router();
const { JWT_SECRET, JWT_ISSUER, JWT_HEAD_ALG, JWT_HEAD_ENC } = process.env;
auth.route("/jwt").post(async (req: Request, res: Response) => {
  const { email: user_email, api_key: input_key } = req.body;
  const email_regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g;
  if (!user_email || !(user_email as string).match(email_regex)) {
    res.status(400).send(ERRORS.NO_EMAIL);
    return;
  }
  if (!input_key || input_key == "") {
    res.status(401).send(ERRORS.NO_KEY);
    return;
  }
  try {
    const { data, error } = await database
      .from("keys")
      .select("email,pepper,salt,api_key,requests")
      .eq("email", user_email);
    if (error) {
      res.status(503).send(error);
      return;
    }
    if (data.length == 0) {
      res.status(401).send(ERRORS.KEY_NOT_FOUND);
      return;
    }
    const { salt, pepper, api_key, requests } = data[0] as unknown as API_KEY;
    const first_hash = bcrypt.hashSync(input_key, salt);
    const second_hash = bcrypt.hashSync(first_hash, pepper);
    if (second_hash != api_key) {
      res.status(401).send(ERRORS.KEY_NOT_FOUND);
      return;
    }
    if (requests >= 100) {
      res.status(429).send(ERRORS.RATE_LIMIT);
      return;
    }
    const secret = jose.base64url.decode(JWT_SECRET as string);
    const jwt = await new jose.EncryptJWT({
      api_key: api_key,
    })
      .setProtectedHeader({
        alg: JWT_HEAD_ALG as string,
        enc: JWT_HEAD_ENC as string,
      })
      .setIssuedAt()
      .setIssuer(JWT_ISSUER as string)
      .setAudience(user_email)
      .setExpirationTime(Date.now() + 12 * 60 * 60 * 1000)
      .encrypt(secret);
    res.status(200).send({ status: "OK", code: 200, token: jwt });
  } catch (err) {
    res.status(501).send(err);
  }
});

auth
  .route("/api_key")
  .post(async (req: Request, res: Response) => {
    const { email, first_name, last_name } = req.body;
    const email_regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g;
    const name_regex = /^([A-Za-z]('[A-Za-z])?[a-z][A-Za-z]{0,2}[a-z]*)/g;
    if (!email || !(email as string).match(email_regex)) {
      res.status(400).send(ERRORS.NO_EMAIL);
      return;
    }
    if (!first_name || !(first_name as string).match(name_regex)) {
      res.status(400).send(ERRORS.NO_FIRST_NAME);
      return;
    }
    if (!last_name || !(last_name as string).match(name_regex)) {
      res.status(400).send(ERRORS.NO_LAST_NAME);
      return;
    }
    try {
      const bytes = randomBytes(256).toString("base64");
      const api_key = `${bytes.slice(0, 7)}.${bytes.slice(8, 35)}`;
      const salt_rounds = Math.floor(Math.random() * 10 + 5);
      const pepper_rounds = Math.floor(Math.random() * 10 + 5);
      const salt = bcrypt.genSaltSync(salt_rounds);
      const pepper = bcrypt.genSaltSync(pepper_rounds);
      const first_hash = bcrypt.hashSync(api_key, salt);
      const second_hash = bcrypt.hashSync(first_hash, pepper);
      const { data, error } = await database
        .from("keys")
        .select("email")
        .eq("email", email);
      if (error) {
        res.status(503).send(error);
        return;
      }
      if (data.length > 0) {
        res.status(409).send(ERRORS.DUPLICATE_KEY);
        return;
      } else {
        const new_data = {
          api_key: second_hash,
          email,
          first_name,
          last_name,
          salt,
          pepper,
        };
        const { error } = await database.from("keys").insert(new_data);
        if (error) {
          res.status(503).send(error);
          return;
        } else {
          res.status(201).send({
            key: api_key,
            message:
              "Please save this api key somewhere secure as it will not be displayed again.",
          });
        }
      }
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .delete((req: Request, res: Response) => {
    const route = req.baseUrl + req.path;
    const method = req.method;
    res.status(501).send({ route, method, ...ERRORS.UNIMPLEMENTED });
  });

export default auth;
