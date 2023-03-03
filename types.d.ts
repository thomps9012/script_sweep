export enum SCRIPT_DIRECTION {
  RTL = "RIGHT_TO_LEFT",
  LTR = "LEFT_TO_RIGHT",
  TTB = "TOP_TO_BOTTOM",
}

export interface SCRIPT {
  id: number;
  name: string;
  ranges: string[][];
  direction: SCRIPT_DIRECTION;
  year: number;
  living: boolean;
  link: string;
  continents: string[];
}
export interface SCRIPT_RES {
  id: number;
  name: string;
  ranges: number[][];
  direction: SCRIPT_DIRECTION;
  year: number;
  living: boolean;
  link: string;
  continents: string[];
}
export interface SCRIPT_INPUT {
  name: string;
  ranges: number[][];
  direction: SCRIPT_DIRECTION;
  year: number;
  living: boolean;
  link: string;
  continents: string[];
}

export interface API_KEY {
  email: string;
  first_name: string;
  last_name: string;
  email_verified: boolean;
  api_key: string;
  requests: number;
  created: Date;
  salt: string;
  pepper: string;
}
export interface SCRIPT_GROUPS {
  script: string;
  words: string[];
  character_percent: number;
  word_percent: number;
}
export interface WORD_CLASSIFIERS {
  script: string;
  word: string;
  characters: number;
}
export interface REDUCED_GROUPS {
  script: string;
  words: string[];
  characters: number;
}
