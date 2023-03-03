import { expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app";
import { JWT, EMAIL } from "../test_data";

const testCases = [
  {
    id: 1,
    input: "this is a test",
    expected: {
      status: "OK",
      code: 200,
      body: [
        {
          character_percent: 100,
          script: "Latin",
          word_percent: 100,
          words: ["this", "is", "a", "test"],
        },
      ],
    },
  },
  {
    id: 2,
    input: "英国的狗说 тяв 英国的",
    expected: {
      status: "OK",
      code: 200,
      body: [
        {
          script: "Han",
          words: ["英国的狗说", "英国的"],
          character_percent: 72,
          word_percent: 66,
        },
        {
          script: "Cyrillic",
          words: ["тяв"],
          character_percent: 27,
          word_percent: 33,
        },
      ],
    },
  },
  {
    id: 3,
    input: "fail",
    expected: {
      status: "SEE OTHER",
      code: 303,
      message:
        "You appear to be attempting to organize one word. Please visit the classification endpoint instead to learn more about your text",
      redirect: "/scripts/classify",
    },
  },
  {
    id: 4,
    input: "hello goodbye в 英国的 اقثقنح",
    expected: {
      status: "OK",
      code: 200,
      body: [
        {
          script: "Latin",
          words: ["hello", "goodbye"],
          character_percent: 54,
          word_percent: 40,
        },
        {
          script: "Cyrillic",
          words: ["в"],
          character_percent: 4,
          word_percent: 20,
        },
        {
          script: "Han",
          words: ["英国的"],
          character_percent: 13,
          word_percent: 20,
        },
        {
          script: "Arabic",
          words: ["اقثقنح"],
          character_percent: 27,
          word_percent: 20,
        },
      ],
    },
  },
];

describe("Organizes text based on their language / script", () => {
  testCases.forEach(({ id, input, expected }) => {
    test(`Test Case ${id} Failed`, (done) => {
      const { body, status, code } = expected;
      request(app)
        .post("/api/organize")
        .set("email", EMAIL)
        .set("token", JWT)
        .send({ text: input })
        .then((res) => {
          expect(res.body.organized_text).toEqual(body);
          expect(res.body.code).toBe(code);
          expect(res.body.status).toBe(status);
          return done();
        });
    });
  });
});
