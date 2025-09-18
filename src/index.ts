import "./styles.css";

const generateButton = document.querySelector(".generate");
const linkElement = document.querySelector(".link");

const rand = (min: number, max: number): string => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString().padStart(max.toString().length);
};

type PatternType = "RAND_4";
interface Pattern {
  prefix: string;
  getSuffix: () => string;
}
const patterns: Pattern[] = [
  {
    prefix: "MVI ",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "MOV ",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "100 ",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "SAM ",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "DSC ",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "SDV ",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "DSCF",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "DSCN",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "PICT",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "MAQ0",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "FILE",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "GOPR",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "GP01",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "GX01",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "DJI ",
    getSuffix: () => rand(0, 9999),
  },
];

const generateQuery = (): string => {
  const randIndex = Math.floor(Math.random() * patterns.length);
  const { prefix, getSuffix } = patterns[randIndex];
  const query = `${prefix}${getSuffix()}`;
  return query;
};

const updateLinkElement = (query: string): void => {
  const link = `https://www.youtube.com/results?search_query=${query.replace(
    / /g,
    "+"
  )}`;
  linkElement.setAttribute("href", link);
  linkElement.textContent = query;
};

generateButton.addEventListener("click", () =>
  updateLinkElement(generateQuery())
);
