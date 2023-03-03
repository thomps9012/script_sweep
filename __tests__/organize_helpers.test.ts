import { expect, test } from "@jest/globals";
import { classifyWord, combineScripts, groupBy } from "../methods/organize";

const wordClassifyTCs = [
  {
    id: 1,
    input: "英国的狗说",
    expected: {
      script: "Han",
      word: "英国的狗说",
      characters: 5,
    },
  },
  {
    id: 2,
    input: "тяв",
    expected: {
      script: "Cyrillic",
      word: "тяв",
      characters: 3,
    },
  },
  {
    id: 3,
    input: "للعللاقثقنح",
    expected: {
      script: "Arabic",
      word: "للعللاقثقنح",
      characters: 11,
    },
  },
  {
    id: 4,
    input: "hello",
    expected: {
      script: "Latin",
      word: "hello",
      characters: 5,
    },
  },
];
describe("Classifies a single word based on it's script", () => {
  wordClassifyTCs.forEach(({ id, input, expected }) => {
    test(`Test Case ${id} Failed`, async () => {
      const result = await classifyWord(input);
      expect(result).toEqual(expected);
    });
  });
});
const combineScriptTCs = [
  {
    id: 1,
    input: [
      { script: "Han", word: "英国的狗说", characters: 5 },
      { script: "Cyrillic", word: "тяв", characters: 3 },
      { script: "Han", word: "英国的", characters: 3 },
    ],
    expected: [
      {
        script: "Han",
        words: ["英国的狗说", "英国的"],
        characters: 8,
      },
      {
        script: "Cyrillic",
        words: ["тяв"],
        characters: 3,
      },
    ],
  },
  {
    id: 2,
    input: [
      { script: "Cyrillic", word: "тяв", characters: 3 },
      { script: "Cyrillic", word: "в", characters: 1 },
      {
        script: "Arabic",
        word: "للعللاقثقنح",
        characters: 11,
      },
    ],
    expected: [
      {
        script: "Cyrillic",
        words: ["тяв", "в"],
        characters: 4,
      },
      {
        script: "Arabic",
        words: ["للعللاقثقنح"],
        characters: 11,
      },
    ],
  },
  {
    id: 3,
    input: [
      {
        script: "Arabic",
        word: "للعللاقثقنح",
        characters: 11,
      },
      {
        script: "Arabic",
        word: "اقثقنح",
        characters: 6,
      },
      { script: "Latin", word: "hello", characters: 5 },
    ],
    expected: [
      {
        script: "Arabic",
        words: ["للعللاقثقنح", "اقثقنح"],
        characters: 17,
      },
      {
        script: "Latin",
        words: ["hello"],
        characters: 5,
      },
    ],
  },
  {
    id: 4,
    input: [
      { script: "Latin", word: "hello", characters: 5 },
      { script: "Latin", word: "goodbye", characters: 7 },
      { script: "Cyrillic", word: "в", characters: 1 },
      { script: "Han", word: "英国的", characters: 3 },
      {
        script: "Arabic",
        word: "اقثقنح",
        characters: 6,
      },
    ],
    expected: [
      {
        script: "Latin",
        words: ["hello", "goodbye"],
        characters: 12,
      },
      {
        script: "Cyrillic",
        words: ["в"],
        characters: 1,
      },
      {
        script: "Han",
        words: ["英国的"],
        characters: 3,
      },
      {
        script: "Arabic",
        words: ["اقثقنح"],
        characters: 6,
      },
    ],
  },
];
describe("Combines unreduced scripts together and calculates their percentage of the total", () => {
  combineScriptTCs.forEach(({ id, input, expected }) => {
    test(`Test Case ${id} Failed`, () => {
      const result = combineScripts(input);
      expect(result).toEqual(expected);
    });
  });
});
const groupByTCs = [
  {
    id: 1,
    input: ["英国的狗说", "тяв", "英国的"],
    expected: [
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
  {
    id: 2,
    input: ["тяв", "в", "للعللاقثقنح"],
    expected: [
      {
        script: "Cyrillic",
        words: ["тяв", "в"],
        character_percent: 26,
        word_percent: 66,
      },
      {
        script: "Arabic",
        words: ["للعللاقثقنح"],
        character_percent: 73,
        word_percent: 33,
      },
    ],
  },
  {
    id: 3,
    input: ["للعللاقثقنح", "اقثقنح", "hello"],
    expected: [
      {
        script: "Arabic",
        words: ["للعللاقثقنح", "اقثقنح"],
        character_percent: 77,
        word_percent: 66,
      },
      {
        script: "Latin",
        words: ["hello"],
        character_percent: 22,
        word_percent: 33,
      },
    ],
  },
  {
    id: 4,
    input: ["hello", "goodbye", "в", "英国的", "اقثقنح"],
    expected: [
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
];
describe("Groups a string by it's scripts and returns an array of information", () => {
  groupByTCs.forEach(({ id, input, expected }) => {
    test(`Test Case ${id} Failed`, async () => {
      const result = await groupBy(input);
      expect(result).toEqual(expected);
    });
  });
});
