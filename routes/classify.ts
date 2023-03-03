import express, { Request, Response } from "express";
import { ERRORS } from "../errors";
import authorization from "../middleware";
import {
  characterNamer,
  countBy,
  scriptCountFormatter,
} from "../methods/classify";
const classify = express.Router();

classify.use(authorization);
classify.route("/").post(async (req: Request, res: Response) => {
  const { text } = req.body;
  const { by } = req.headers;
  let stringArr;
  let classified_by;
  if (!text) {
    res.status(400).send(ERRORS.MALFORMED_BODY);
    return;
  }
  if (!by || by != "word") {
    stringArr = text.split("");
    classified_by = "character";
  } else {
    stringArr = text.split(" ");
    classified_by = "word";
  }
  try {
    const scriptCount = (await countBy(stringArr, characterNamer)).filter(
      ({ name }) => name != null
    );
    const total = scriptCount.reduce((n, { count }) => n + count, 0);
    if (total == 0) {
      res.status(404).send(ERRORS.SCRIPT_NOT_FOUND);
      return;
    } else {
      const data = scriptCountFormatter(scriptCount, total);
      res.status(200).send({
        status: "OK",
        code: 200,
        classified_by,
        classified_text: data,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
export default classify;
