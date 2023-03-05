import { expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app";
import { JWT, EMAIL } from "../test_data";
const testCases = [
  {
    id: 1,
    input: "英国的狗说'woof', 俄罗斯的狗说'тяв'",
    word_expected: {
      status: "OK",
      code: 200,
      classified_text: [
        {
          script: "Han",
          int_percent: 100,
          string_percent: "100%",
        },
      ],
    },
    char_expected: {
      status: "OK",
      code: 200,
      classified_text: [
        {
          script: "Han",
          int_percent: 61,
          string_percent: "61%",
        },
        {
          script: "Latin",
          int_percent: 22,
          string_percent: "22%",
        },
        {
          script: "Cyrillic",
          int_percent: 17,
          string_percent: "17%",
        },
      ],
    },
  },
  {
    id: 2,
    input: ``,
    word_expected: {
      status: "BAD REQUEST",
      code: 400,
      message:
        "We couldn't find a 'text' key in your request body. Ensure your request matches the classification and organization models.",
      documentation_link:
        "https://thomps9012.github.io/script_sweep/docs/endpoints/classify",
      second_documentation_link:
        "https://thomps9012.github.io/script_sweep/docs/endpoints/organize",
    },
    char_expected: {
      status: "BAD REQUEST",
      code: 400,
      message:
        "We couldn't find a 'text' key in your request body. Ensure your request matches the classification and organization models.",
      documentation_link:
        "https://thomps9012.github.io/script_sweep/docs/endpoints/classify",
      second_documentation_link:
        "https://thomps9012.github.io/script_sweep/docs/endpoints/organize",
    },
  },
  {
    id: 3,
    input: "this is a test",
    word_expected: {
      status: "OK",
      code: 200,
      classified_text: [
        {
          script: "Latin",
          int_percent: 100,
          string_percent: "100%",
        },
      ],
    },
    char_expected: {
      status: "OK",
      code: 200,
      classified_text: [
        {
          script: "Latin",
          int_percent: 100,
          string_percent: "100%",
        },
      ],
    },
  },
  {
    id: 4,
    input: "hello goodbye в 英国的 اقثقنح",
    word_expected: {
      status: "OK",
      code: 200,
      classified_text: [
        {
          script: "Latin",
          int_percent: 40,
          string_percent: "40%",
        },
        {
          script: "Cyrillic",
          int_percent: 20,
          string_percent: "20%",
        },
        {
          script: "Han",
          int_percent: 20,
          string_percent: "20%",
        },
        {
          script: "Arabic",
          int_percent: 20,
          string_percent: "20%",
        },
      ],
    },
    char_expected: {
      status: "OK",
      code: 200,
      classified_text: [
        {
          script: "Latin",
          int_percent: 55,
          string_percent: "55%",
        },
        {
          script: "Cyrillic",
          int_percent: 5,
          string_percent: "5%",
        },
        {
          script: "Han",
          int_percent: 14,
          string_percent: "14%",
        },
        {
          script: "Arabic",
          int_percent: 27,
          string_percent: "27%",
        },
      ],
    },
  },
];
describe("Classifies words based on their language / script by word", () => {
  testCases.forEach(({ id, input, word_expected }) => {
    test(`Test Case ${id} Failed`, (done) => {
      const { classified_text, status, code } = word_expected;
      request(app)
        .post("/api/classify")
        .set("email", EMAIL)
        .set("token", JWT)
        .set("by", "word")
        .send({ text: input })
        .then((res) => {
          if (id != 2) {
            expect(res.body.classified_by).toBe("word");
          }
          expect(res.body.classified_text).toEqual(classified_text);
          expect(res.body.code).toBe(code);
          expect(res.body.status).toBe(status);
          return done();
        });
    });
  });
});
jest.setTimeout(10 * 1000);
describe("Classifies characters based on their language / script by character", () => {
  testCases.forEach(({ id, input, char_expected }) => {
    test(`Test Case ${id} Failed`, (done) => {
      const { classified_text, status, code } = char_expected;
      request(app)
        .post("/api/classify")
        .set("email", EMAIL)
        .set("token", JWT)
        .send({ text: input })
        .then((res) => {
          if (id != 2) {
            expect(res.body.classified_by).toBe("character");
          }
          expect(res.body.classified_text).toEqual(classified_text);
          expect(res.body.code).toBe(code);
          expect(res.body.status).toBe(status);
          return done();
        });
    });
  });
});
