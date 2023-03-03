import express, { Response, Request } from "express";
import database from "../db";
import { ERRORS } from "../errors";
import authorization from "../middleware";
const scripts = express.Router();
scripts.use(authorization);
scripts
  .route("/")
  .get(async (req: Request, res: Response) => {
    const { fields, limit, order_by, order_direction } = req.headers;
    let query;
    if (fields) {
      query = database.from("scripts").select(fields as string);
    } else {
      query = database.from("scripts").select();
    }
    if (limit) {
      query.limit(parseInt(limit as string));
    }
    if (order_by) {
      if (order_direction == "desc") {
        query.order(order_by as string, { ascending: false });
      } else {
        query.order(order_by as string, { ascending: true });
      }
    }
    const { data, error } = await query;
    if (error) {
      res.status(503).send(error);
      return;
    }
    if (data.length == 0) {
      res.status(404).send(ERRORS.NO_FILTERED_RESULTS);
      return;
    }
    res.status(200).send(data);
  })
  .post((req: Request, res: Response) => {
    const route = req.baseUrl + req.path;
    const method = req.method;
    res.status(501).send({ route, method, ...ERRORS.UNIMPLEMENTED });
  });

scripts.route("/filter").get(async (req: Request, res: Response) => {
  const {
    max_year,
    min_year,
    living,
    direction,
    continent,
    fields,
    limit,
    order_by,
    order_direction,
  } = req.headers;
  let query;
  if (fields) {
    query = database.from("scripts").select(fields as string);
  } else {
    query = database.from("scripts").select();
  }
  if (max_year) {
    query = query.lte("year", parseInt(max_year as string));
  }
  if (min_year) {
    query = query.gte("year", parseInt(min_year as string));
  }
  if (living) {
    query = query.eq("living", JSON.parse(living as string));
  }
  if (direction) {
    query = query.eq("direction", direction);
  }
  if (continent) {
    query = query.contains("continents", [continent]);
  }
  if (limit) {
    query = query.limit(parseInt(limit as string));
  }
  if (order_by) {
    if (order_direction == "desc") {
      query.order(order_by as string, { ascending: false });
    } else {
      query.order(order_by as string, { ascending: true });
    }
  }
  try {
    const { data, error } = await query;
    if (error) {
      res.status(503).send(error);
      return;
    }
    if (data.length == 0) {
      res.status(404).send(ERRORS.NO_FILTERED_RESULTS);
      return;
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

scripts
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { fields } = req.headers;
    let query;
    if (fields) {
      query = database.from("scripts").select(fields as string);
    } else {
      query = database.from("scripts").select();
    }
    try {
      const { data, error } = await query.eq("id", id);
      if (error) {
        res.status(503).send(error);
        return;
      }
      if (data.length == 0) {
        res.status(404).send(ERRORS.ID_NOT_FOUND);
        return;
      }
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .put((req: Request, res: Response) => {
    const route = req.baseUrl + req.path;
    const method = req.method;
    res.status(501).send({ route, method, ...ERRORS.UNIMPLEMENTED });
  });

export default scripts;
