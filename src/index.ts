import "./styles.css";

const generateButton = document.querySelector(".generate");
const linkElement = document.querySelector(".link");

type PatternType = "RAND_4";
interface Pattern {
  prefix: string;
  type: PatternType;
}
const patterns: Pattern[] = [
  { prefix: "MVI ", type: "RAND_4" },
  { prefix: "MOV ", type: "RAND_4" },
  { prefix: "100 ", type: "RAND_4" },
  { prefix: "SAM ", type: "RAND_4" },
  { prefix: "DSC ", type: "RAND_4" },
  { prefix: "SDV ", type: "RAND_4" },
  { prefix: "DSCF", type: "RAND_4" },
  { prefix: "DSCN", type: "RAND_4" },
  { prefix: "PICT", type: "RAND_4" },
  { prefix: "MAQ0", type: "RAND_4" },
  { prefix: "FILE", type: "RAND_4" },
  { prefix: "GOPR", type: "RAND_4" },
  { prefix: "GP01", type: "RAND_4" },
  { prefix: "GX01", type: "RAND_4" },
  { prefix: "DJI ", type: "RAND_4" },
];

const generateQuery = (): string => {
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  const randString = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0");
  const query = `${pattern.prefix}${randString}`;

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
