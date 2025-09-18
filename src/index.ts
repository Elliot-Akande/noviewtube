import "./styles.css";

const generateButton = document.querySelector(".generate");
const linkElement = document.querySelector(".link");

const rand = (min: number, max: number): string => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString().padStart(max.toString().length);
};

interface Pattern {
  prefix: string;
  getSuffix?: () => string;
  comment?: string;
}
const patterns: Pattern[] = [
  {
    prefix: "MVI ",
    getSuffix: () => rand(0, 9999),
  },
  {
    prefix: "MOV ",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "100 ",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "SAM ",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "DSC ",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "SDV ",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "DSCF",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "DSCN",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "PICT",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "MAQ0",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "FILE",
    getSuffix: () => rand(0, 9999),
    comment: "Dashcam",
  },
  {
    prefix: "GOPR",
    getSuffix: () => rand(0, 9999),
    comment: "GoPro",
  },
  {
    prefix: "GP01",
    getSuffix: () => rand(0, 9999),
    comment: "GoPro",
  },
  {
    prefix: "GX01",
    getSuffix: () => rand(0, 9999),
    comment: "GoPro",
  },
  {
    prefix: "DJI ",
    getSuffix: () => rand(0, 9999),
    comment: "Drone",
  },
  {
    prefix: "HNI 0",
    getSuffix: () => rand(0, 100),
    comment: "Nintendo DS",
  },
  {
    prefix: "WA0",
    getSuffix: () => rand(0, 999),
  },
  // MOL0XX (A-F, 0-9) [MOL0E5] (Camera)
  {
    prefix: "MOL0",
    getSuffix: () => rand(0, 99),
  },
  {
    prefix: "HMS ",
    getSuffix: () => `${rand(0, 23)}${rand(0, 59)}${rand(0, 59)}`,
  },
  {
    prefix: "P100",
    getSuffix: () => rand(0, 1999),
    comment: "Camera",
  },
  {
    prefix: "VTS ",
    getSuffix: () => `${rand(0, 99)} ${rand(0, 9)}`,
    comment: "VHS",
  },
  {
    prefix: "VTS ",
    getSuffix: () => `${rand(0, 999)} 1`,
    comment: "VHS",
  },
  {
    prefix: "VTS 01 ",
    getSuffix: () => rand(0, 999),
    comment: "VHS",
  },
  {
    prefix: "My Slideshow Video",
    comment: "Video Editor",
  },
  {
    prefix: "My Slideshow",
    comment: "Video Editor",
  },
  {
    prefix: "My Slideshow ",
    getSuffix: () => rand(0, 99),
    comment: "Video Editor",
  },
  {
    prefix: "My Stupeflix Video",
    comment: "Video Editor",
  },
  {
    prefix: "My Stupeflix Video ",
    getSuffix: () => rand(0, 1050),
    comment: "Video Editor",
  },
  // YMD (20250826)
  // WIN YMD (>2013)
  // VID YMD (>2008)
  // Capture YMD (>2008)
  // InShot YMD (>2016)
  // PXL YMD (>2020)
  // AUD-YMD (>2017)
  // 240p 400k (Filter: Playlist) NSFW
  // 480p 600k             ^             NSFW
  // 480p 2000k           ^             NSFW
  // 720p 1500k           ^             NSFW
  // 720p 4000k           ^             NSFW
  // Clips4Sale            ^             NSFW
  // WhatsApp Video YYYY MM DD  (>2015)
  // Desktop YYYY MM DD (Game Capture)
  {
    prefix: "Axon Body * Video",
    comment: "Body Cam",
  },
  // WP YMD (Misc) (>2011)
  // “Video YMD” (Misc) (>2012)
  // KakaoTalk Video YYYY MM (Misc) (>2012)
  {
    prefix: "AVSEQ",
    getSuffix: () => rand(0, 99),
  },
  {
    prefix: "AVSEQ",
    getSuffix: () => `${rand(0, 99)}.DAT`,
  },
  {
    prefix: "MOVI",
    getSuffix: () => rand(0, 1050),
    comment: "Drone / Dashcam",
  },
  // GMTYMD (Zoom)
  {
    prefix: "SVM A",
    getSuffix: () => rand(0, 1000),
    comment: "Camera",
  },
  {
    prefix: "KVID",
    getSuffix: () => rand(0, 1000),
    comment: "Camera",
  },
  {
    prefix: "My Videolicious Video",
    comment: "Video Editor",
  },
  {
    prefix: "M2U0",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "GH01",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  // “Month DD, YYYY” [“May 02, 2011”] (Phone)
  {
    prefix: "MAH0",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "CIMG",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "IMGP",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "Video",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "MOV0",
    getSuffix: () => rand(0, 9999),
    comment: "Camera",
  },
  {
    prefix: "MUSIC",
    getSuffix: () => rand(0, 99),
  },
  {
    prefix: "REC ",
    getSuffix: () => rand(0, 1000),
    comment: "Drone / Dashcam",
  },
];

const generateQuery = (): string => {
  const randIndex = Math.floor(Math.random() * patterns.length);
  const { prefix, getSuffix } = patterns[randIndex];
  const query = getSuffix ? `${prefix}${getSuffix()}` : prefix;
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
