import express, { Request, Response } from "express";
import { ERRORS } from "../errors";
import authorization from "../middleware";
import { groupBy } from "../methods/organize";
const organize = express.Router();
organize.use(authorization);
organize.route("/").post(async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).send(ERRORS.MALFORMED_BODY);
    return;
  }
  const stringArr = text.split(" ");
  try {
    if (stringArr.length == 1) {
      res.status(303).send(ERRORS.CLASSIFY_REDIRECT);
      return;
    } else {
      const data = await groupBy(stringArr);
      res.status(200).send({
        status: "OK",
        code: 200,
        organized_text: data,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

export default organize;
