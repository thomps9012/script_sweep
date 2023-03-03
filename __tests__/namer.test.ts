import { expect, test } from "@jest/globals";
import { characterNamer } from "../methods/classify";

const namerTC = [
  {
    id: 1,
    input: "a",
    expected: "Latin",
  },
  {
    id: 2,
    input: String.fromCodePoint(0),
    expected: null,
  },
  {
    id: 3,
    input: "🍕",
    expected: "Emoji",
  },
  {
    id: 4,
    input: "",
    expected: null,
  },
  {
    id: 5,
    input: "hello",
    expected: "Latin",
  },
  {
    id: 6,
    input: "英国的狗说",
    expected: "Han",
  },
  { id: 7, input: "тяв", expected: "Cyrillic" },
];

namerTC.forEach(({ id, input, expected }) =>
  test(`Test Case ${id} Failed with => Input: ${input}`, async () => {
    const results = await characterNamer(input);
    expect(results).toBe(expected);
  })
);
