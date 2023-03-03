import { REDUCED_GROUPS, SCRIPT_GROUPS, WORD_CLASSIFIERS } from "../types";
import { characterNamer } from "./classify";

/* TEST COVERAGE */
export async function classifyWord(word: string) {
  const currentClassifier = await characterNamer(word[0]);
  const word_characters = word.length;
  if (currentClassifier == null) {
    return {
      script: "unknown",
      word: word,
      characters: word_characters,
    };
  }
  word.split("").forEach(async (character) => {
    const scriptUsed = await characterNamer(character);
    if (scriptUsed != currentClassifier) {
      return {
        script: "mixed",
        word: word,
        characters: word_characters,
      };
    }
  });
  return {
    script: currentClassifier as string,
    word: word,
    characters: word_characters,
  };
}
/* TEST COVERAGE */
export function combineScripts(unReduced: WORD_CLASSIFIERS[]) {
  const reduced: REDUCED_GROUPS[] = [];
  unReduced.forEach(({ script, word, characters }) => {
    const exists = reduced.findIndex(
      ({ script: reducedScript }) => script == reducedScript
    );
    if (exists != -1) {
      reduced[exists].characters += characters;
      reduced[exists].words.push(word);
    } else {
      reduced.push({ script, words: [word], characters });
    }
  });
  return reduced;
}
/* TEST COVERAGE */
export async function groupBy(words: string[]) {
  const unReduced: WORD_CLASSIFIERS[] = [];
  let totalCharacters = 0;
  const totalWords = words.length;
  for (const word of words) {
    const classified = await classifyWord(word);
    totalCharacters += classified.characters;
    unReduced.push(classified);
  }
  const combined = combineScripts(unReduced);
  const scriptGroups: SCRIPT_GROUPS[] = combined.map(
    ({ script, words, characters }) => {
      return {
        script,
        words,
        word_percent: Math.floor((words.length / totalWords) * 100),
        character_percent: Math.floor((characters / totalCharacters) * 100),
      };
    }
  );
  return scriptGroups;
}
