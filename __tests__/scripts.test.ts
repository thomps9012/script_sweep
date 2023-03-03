import { expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app";
import { JWT, EMAIL } from "../test_data";
describe("All scripts endpoint, with or without specified headers", () => {
  test("Returns all scripts", (done) => {
    request(app)
      .get("/api/scripts")
      .set("email", EMAIL)
      .set("token", JWT)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(140);
        expect(res.body[0]).toEqual({
          name: "Adlam",
          id: 1,
          ranges: [
            [125184, 125259],
            [125264, 125274],
            [125278, 125280],
          ],
          direction: "RIGHT_TO_LEFT",
          year: 1987,
          living: true,
          link: "https://en.wikipedia.org/wiki/Fula_alphabets#Adlam_alphabet",
          continents: ["AF"],
        });
        return done();
      });
  });
  test("Returns the first ten scripts", (done) => {
    request(app)
      .get("/api/scripts")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("limit", "10")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(10);
        expect(res.body[0]).toEqual({
          name: "Adlam",
          id: 1,
          ranges: [
            [125184, 125259],
            [125264, 125274],
            [125278, 125280],
          ],
          direction: "RIGHT_TO_LEFT",
          year: 1987,
          living: true,
          link: "https://en.wikipedia.org/wiki/Fula_alphabets#Adlam_alphabet",
          continents: ["AF"],
        });
        return done();
      });
  });
  test("Returns the last ten scripts, ordered by id", (done) => {
    request(app)
      .get("/api/scripts")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("limit", "10")
      .set("order_by", "id")
      .set("fields", "id, name, direction, year, living, link, continents")
      .set("order_direction", "desc")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(10);
        expect(res.body[0]).toEqual({
          name: "Emoji",
          id: 140,
          direction: "LEFT_TO_RIGHT",
          year: 1997,
          living: true,
          link: "https://en.wikipedia.org/wiki/Emoji",
          continents: ["AS", "NA", "SA", "AF", "EU", "AU"],
        });
        return done();
      });
  });
  test("Returns only ids and names of the first ten scripts", (done) => {
    request(app)
      .get("/api/scripts")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("limit", "10")
      .set("order_by", "id")
      .set("fields", "id, name")
      .set("order_direction", "desc")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(10);
        expect(res.body).toEqual([
          { id: 140, name: "Emoji" },
          { id: 139, name: "Zanabazar Square" },
          { id: 138, name: "Yi" },
          { id: 137, name: "Cuneiform" },
          { id: 136, name: "Old Persian" },
          { id: 135, name: "Warang Citi" },
          { id: 134, name: "Vai" },
          { id: 133, name: "Ugaritic" },
          { id: 132, name: "Tirhuta" },
          { id: 131, name: "Tibetan" },
        ]);
        return done();
      });
  });
  test("Returns only ids and names of the first ten scripts", (done) => {
    request(app)
      .get("/api/scripts")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("limit", "10")
      .set("order_by", "id")
      .set("fields", "id, name")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(10);
        expect(res.body).toEqual([
          { id: 1, name: "Adlam" },
          { id: 2, name: "Caucasian Albanian" },
          { id: 3, name: "Ahom" },
          { id: 4, name: "Arabic" },
          { id: 5, name: "Imperial Aramaic" },
          { id: 6, name: "Armenian" },
          { id: 7, name: "Avestan" },
          { id: 8, name: "Balinese" },
          { id: 9, name: "Bamum" },
          { id: 10, name: "Bassa Vah" },
        ]);
        return done();
      });
  });
});
