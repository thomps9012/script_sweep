import { expect, test } from "@jest/globals";

import { countBy } from "../methods/classify";

const countByTC = [
  {
    id: 1,
    input_items: ["a", "b", "c", "a", "b", "c"],
    input_function: function (a: string): string {
      return a;
    },
    expected: [
      { name: "a", count: 2 },
      { name: "b", count: 2 },
      { name: "c", count: 2 },
    ],
  },
  {
    id: 2,
    input_items: ["aa", "bb", "cc", "a", "b", "c"],
    input_function: function (a: string): string {
      return a;
    },
    expected: [
      { name: "aa", count: 1 },
      { name: "bb", count: 1 },
      { name: "cc", count: 1 },
      { name: "a", count: 1 },
      { name: "b", count: 1 },
      { name: "c", count: 1 },
    ],
  },
  {
    id: 3,
    input_items: [
      "apple",
      "banana",
      "cherry",
      "date",
      "celery",
      "tomato",
      "cucumber",
    ],
    input_function: function (string: string): string {
      if (string != "celery" && string != "cucumber") {
        return "fruit";
      } else {
        return "veggie";
      }
    },
    expected: [
      { name: "fruit", count: 5 },
      { name: "veggie", count: 2 },
    ],
  },
];

countByTC.forEach(({ id, input_items, input_function, expected }) =>
  test(`Test Case ${id} Failed with => Input: ${input_items} => Function: ${input_function}`, async () => {
    const results = await countBy(input_items, input_function);
    expect(results).toEqual(expected);
  })
);
