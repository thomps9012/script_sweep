import database from "../db";
import { SCRIPT } from "../types";
/* TEST COVERAGE */
export async function countBy(
  items: string[],
  groupName: {
    (char: string): string | Promise<string | null>;
  }
) {
  const counts: { name: string; count: number }[] = [];
  for (const item of items) {
    const name = (await groupName(item)) as unknown as string;
    const known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

/* TEST COVERAGE */
export async function characterScript(
  ansiCode: number
): Promise<string | null> {
  const { data, error } = await database.from("scripts").select();
  if (error) {
    console.log(error);
    return null;
  }
  for (const script of data as SCRIPT[]) {
    if (
      script.ranges.some(([from, to]) => {
        return ansiCode >= parseInt(from) && ansiCode < parseInt(to);
      })
    ) {
      return script.name;
    }
  }
  return null;
}

/* TEST COVERAGE */
export async function characterNamer(char: string): Promise<string | null> {
  const ansiCode = char.codePointAt(0);
  if (typeof ansiCode == "number") {
    const script_name = await characterScript(ansiCode);
    return script_name;
  } else {
    return null;
  }
}

/* TEST COVERAGE */
export function scriptCountFormatter(
  scriptCount: { name: string | null; count: number }[],
  total: number
) {
  const formatted = scriptCount.map(({ name, count }) => ({
    script: name,
    int_percent: Math.round((count * 100) / total),
    string_percent: `${Math.round((count * 100) / total)}%`,
  }));
  return formatted;
}
