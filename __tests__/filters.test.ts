import { expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app";
import { JWT, EMAIL } from "../test_data";
describe("Filtered by living status", () => {
  test("Alive languages", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("living", "true")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(84);
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
  test("Dead languages", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("living", "false")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(56);
        expect(res.body[0]).toEqual({
          name: "Caucasian Albanian",
          id: 2,
          ranges: [
            [66864, 66916],
            [66927, 66928],
          ],
          direction: "LEFT_TO_RIGHT",
          year: 420,
          living: false,
          link: "https://en.wikipedia.org/wiki/Caucasian_Albanian_alphabet",
          continents: ["EU", "AS"],
        });
        return done();
      });
  });
});
describe("Filtered by text / script direction", () => {
  test("Left to Right", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("direction", "LEFT_TO_RIGHT")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(109);
        expect(res.body[0]).toEqual({
          name: "Caucasian Albanian",
          id: 2,
          ranges: [
            [66864, 66916],
            [66927, 66928],
          ],
          direction: "LEFT_TO_RIGHT",
          year: 420,
          living: false,
          link: "https://en.wikipedia.org/wiki/Caucasian_Albanian_alphabet",
          continents: ["EU", "AS"],
        });
        return done();
      });
  });
  test("Right to Left", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("direction", "RIGHT_TO_LEFT")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(28);
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
  test("Top to Bottom", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("direction", "TOP_TO_BOTTOM")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);
        expect(res.body[0]).toEqual({
          name: "Mongolian",
          id: 78,
          ranges: [
            [6144, 6146],
            [6148, 6149],
            [6150, 6159],
            [6160, 6170],
            [6176, 6264],
            [6272, 6315],
            [71264, 71277],
          ],
          direction: "TOP_TO_BOTTOM",
          year: 1204,
          living: false,
          link: "https://en.wikipedia.org/wiki/Mongolian_script",
          continents: ["AS"],
        });
        return done();
      });
  });
});
describe("Filtered by year", () => {
  test("Minimum year", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("min_year", "1821")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(28);
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
  test("Maximum year", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("max_year", "-500")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(20);
        expect(res.body[0]).toEqual({
          name: "Carian",
          id: 21,
          ranges: [[66208, 66257]],
          direction: "LEFT_TO_RIGHT",
          year: -650,
          living: false,
          link: "https://en.wikipedia.org/wiki/Carian_alphabets",
          continents: ["AS"],
        });
        return done();
      });
  });
  test("Minimum and maximum year", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("min_year", "1821")
      .set("max_year", "1825")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toEqual({
          name: "Braille",
          id: 16,
          ranges: [[10240, 10496]],
          direction: "LEFT_TO_RIGHT",
          year: 1824,
          living: true,
          link: "https://en.wikipedia.org/wiki/Braille",
          continents: ["AF", "AS", "EU", "NA", "SA", "AU"],
        });
        return done();
      });
  });
});
describe("Filtered by continent", () => {
  test("Africa", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("continent", "AF")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(34);
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
  test("North America", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("continent", "NA")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(10);
        expect(res.body[0]).toEqual({
          name: "Braille",
          id: 16,
          ranges: [[10240, 10496]],
          direction: "LEFT_TO_RIGHT",
          year: 1824,
          living: true,
          link: "https://en.wikipedia.org/wiki/Braille",
          continents: ["AF", "AS", "EU", "NA", "SA", "AU"],
        });
        return done();
      });
  });
  test("South America", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("continent", "SA")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);
        expect(res.body[0]).toEqual({
          name: "Braille",
          id: 16,
          ranges: [[10240, 10496]],
          direction: "LEFT_TO_RIGHT",
          year: 1824,
          living: true,
          link: "https://en.wikipedia.org/wiki/Braille",
          continents: ["AF", "AS", "EU", "NA", "SA", "AU"],
        });
        return done();
      });
  });
  test("Europe", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("continent", "EU")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(32);
        expect(res.body[0]).toEqual({
          name: "Caucasian Albanian",
          id: 2,
          ranges: [
            [66864, 66916],
            [66927, 66928],
          ],
          direction: "LEFT_TO_RIGHT",
          year: 420,
          living: false,
          link: "https://en.wikipedia.org/wiki/Caucasian_Albanian_alphabet",
          continents: ["EU", "AS"],
        });
        return done();
      });
  });
  test("Asia", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("continent", "AS")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(111);
        expect(res.body[0]).toEqual({
          name: "Caucasian Albanian",
          id: 2,
          ranges: [
            [66864, 66916],
            [66927, 66928],
          ],
          direction: "LEFT_TO_RIGHT",
          year: 420,
          living: false,
          link: "https://en.wikipedia.org/wiki/Caucasian_Albanian_alphabet",
          continents: ["EU", "AS"],
        });
        return done();
      });
  });
  test("Australia", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("continent", "AU")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(5);
        expect(res.body[0]).toEqual({
          name: "Braille",
          id: 16,
          ranges: [[10240, 10496]],
          direction: "LEFT_TO_RIGHT",
          year: 1824,
          living: true,
          link: "https://en.wikipedia.org/wiki/Braille",
          continents: ["AF", "AS", "EU", "NA", "SA", "AU"],
        });
        return done();
      });
  });
});
describe("Multiple filters and headers", () => {
  test("Should return no results", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("continent", "AF")
      .set("direction", "TOP_TO_BOTTOM")
      .set("min_year", "-550")
      .set("max_year", "-500")
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
          status: "NOT FOUND",
          code: 404,
          documentation_link:
            "https://thomps9012.github.io/script_sweep/endpoints/scripts",
          message:
            "We couldn't find any scripts that matched the parameters and filters that you've set. Please broaden your search headers to view results.",
        });
        return done();
      });
  });
  test("Should return one language", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("continent", "AF")
      .set("min_year", "-550")
      .set("max_year", "-500")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body).toEqual([
          {
            name: "Old Persian",
            id: 136,
            ranges: [
              [66464, 66500],
              [66504, 66518],
            ],
            direction: "LEFT_TO_RIGHT",
            year: -525,
            living: false,
            link: "https://en.wikipedia.org/wiki/Old_Persian_cuneiform",
            continents: ["AS", "EU", "AF"],
          },
        ]);
        return done();
      });
  });
  test("Should return two languages", (done) => {
    request(app)
      .get("/api/scripts/filter")
      .set("email", EMAIL)
      .set("token", JWT)
      .set("continent", "AF")
      .set("min_year", "-600")
      .set("max_year", "-500")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body).toEqual([
          {
            name: "Samaritan",
            id: 105,
            ranges: [
              [2048, 2094],
              [2096, 2111],
            ],
            direction: "RIGHT_TO_LEFT",
            year: -600,
            living: true,
            link: "https://en.wikipedia.org/wiki/Samaritan_alphabet",
            continents: ["AS", "EU", "AF"],
          },
          {
            name: "Old Persian",
            id: 136,
            ranges: [
              [66464, 66500],
              [66504, 66518],
            ],
            direction: "LEFT_TO_RIGHT",
            year: -525,
            living: false,
            link: "https://en.wikipedia.org/wiki/Old_Persian_cuneiform",
            continents: ["AS", "EU", "AF"],
          },
        ]);
        return done();
      });
  });
});
