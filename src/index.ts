import "./styles.css";

const generateButton = document.querySelector(".generate");
const linkElement = document.querySelector(".link");

const rand = (min: number, max: number): string => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString().padStart(max.toString().length, "0");
};

interface RandDate {
  startYear?: number;
  pattern?: string;
}
const randDate = ({ startYear = 1980, pattern }: RandDate = {}) => {
  const start = new Date(startYear, 0, 1);
  const end = new Date();
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const [day, month, year] = date.toLocaleDateString("en-UK").split("/");
  if (!pattern) {
    return `${year}${month}${day}`;
  }

  const patternFragments = {
    YYYY: year,
    YY: year.slice(2),
    MM: month,
    DD: day,
  };
  const formatted = Object.entries(patternFragments).reduce(
    (prev, [key, val]) => prev.replace(key, val),
    pattern
  );
  return formatted;
};

type Filter = "PLAYLIST" | "UPLOAD_DATE";
interface Pattern {
  prefix: string;
  getSuffix?: () => string;
  comment?: string;
  filter?: Filter;
}
const patterns: Pattern[] = [
  /**
   * Old videos
   */
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
    prefix: '"My Slideshow Video"',
    comment: "Video Editor",
  },
  {
    prefix: '"My Slideshow"',
    comment: "Video Editor",
  },
  {
    prefix: '"My Slideshow',
    getSuffix: () => `${rand(0, 99)}"`,
    comment: "Video Editor",
  },
  {
    prefix: '"My Stupeflix Video"',
    comment: "Video Editor",
  },
  {
    prefix: '"My Stupeflix Video',
    getSuffix: () => `${rand(0, 1050)}"`,
    comment: "Video Editor",
  },
  {
    prefix: "",
    getSuffix: () => randDate(),
  },
  {
    prefix: "WIN ",
    getSuffix: () => randDate({ startYear: 2013 }),
  },
  {
    prefix: "VID ",
    getSuffix: () => randDate({ startYear: 2008 }),
  },
  {
    prefix: "Capture ",
    getSuffix: () => randDate({ startYear: 2008 }),
  },
  {
    prefix: "InShot ",
    getSuffix: () => randDate({ startYear: 2016 }),
  },
  {
    prefix: "PXL ",
    getSuffix: () => randDate({ startYear: 2020 }),
  },
  {
    prefix: "AUD-",
    getSuffix: () => randDate({ startYear: 2017 }),
  },
  {
    prefix: "240p 400k",
    filter: "PLAYLIST",
    comment: "NSFW Playlist",
  },
  {
    prefix: "480p 600k",
    filter: "PLAYLIST",
    comment: "NSFW Playlist",
  },
  {
    prefix: "480p 2000k",
    filter: "PLAYLIST",
    comment: "NSFW Playlist",
  },
  {
    prefix: "720p 1500k",
    filter: "PLAYLIST",
    comment: "NSFW Playlist",
  },
  {
    prefix: "720p 4000k",
    filter: "PLAYLIST",
    comment: "NSFW Playlist",
  },
  {
    prefix: "Clips4Sale",
    filter: "PLAYLIST",
    comment: "NSFW Playlist",
  },
  {
    prefix: "WhatsApp Video ",
    getSuffix: () => randDate({ startYear: 2015, pattern: "YYYY MM DD" }),
  },
  {
    prefix: "Desktop ",
    getSuffix: () => randDate({ pattern: "YYYY MM DD" }),
    comment: "Game Capture",
  },
  {
    prefix: '"Axon Body * Video"',
    comment: "Body Cam",
  },
  {
    prefix: "WP ",
    getSuffix: () => randDate({ startYear: 2011 }),
  },
  {
    prefix: '"Video ',
    getSuffix: () => `${randDate({ startYear: 2012 })}"`,
  },
  {
    prefix: "KakaoTalk Video ",
    getSuffix: () => randDate({ startYear: 2012, pattern: "YYYY MM" }),
  },
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
  {
    prefix: "GMT",
    getSuffix: () => randDate({ startYear: 2018 }),
    comment: "Zoom",
  },
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
    prefix: '"My Videolicious Video"',
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
  // \"Month DD, YYYY\" [\"May 02, 2011\"] (Phone)
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
  /**
   * New videos
   */
  { prefix: "IMG", comment: "Smartphone", filter: "UPLOAD_DATE" },
  { prefix: "MVI", comment: "Camera", filter: "UPLOAD_DATE" },
  {
    prefix: "",
    getSuffix: () => randDate(),
    comment: "Misc",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: "WIN ",
    getSuffix: () => randDate(),
    comment: "Webcam",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: "Capture ",
    getSuffix: () => randDate(),
    comment: "Webcam",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: "VID ",
    getSuffix: () => randDate(),
    comment: "Misc",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: '"My Movie ',
    getSuffix: () => `${rand(0, 9)}"`,
    comment: "Misc",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: '"My Edited Video"',
    comment: "Video editor",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: "/Storage/Emulated/",
    comment: "Video editor",
    filter: "UPLOAD_DATE",
  },
  { prefix: "PXL", comment: "Smartphone", filter: "UPLOAD_DATE" },
  {
    prefix: "InShot ",
    getSuffix: () => randDate(),
    comment: "App",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: "WhatsApp Video ",
    getSuffix: () => randDate({ pattern: "YYYY" }),
    comment: "App",
    filter: "UPLOAD_DATE",
  },
  { prefix: "FullSizeRender", comment: "Smartphone", filter: "UPLOAD_DATE" },
  { prefix: "RPReplay ", comment: "Screen Recorder", filter: "UPLOAD_DATE" },
  { prefix: "VTS 01", comment: "VHS", filter: "UPLOAD_DATE" },
  { prefix: "DVR", comment: "Game Capture", filter: "UPLOAD_DATE" },
  {
    prefix: "VLC Record",
    comment: "Game Capture / Misc",
    filter: "UPLOAD_DATE",
  },
  { prefix: "Robloxapp", comment: "Game Capture", filter: "UPLOAD_DATE" },
  { prefix: '".MP4"', comment: "Format", filter: "UPLOAD_DATE" },
  { prefix: '".3gp"', comment: "Format", filter: "UPLOAD_DATE" },
  { prefix: '".MOV"', comment: "Format", filter: "UPLOAD_DATE" },
  { prefix: '".AVI"', comment: "Format", filter: "UPLOAD_DATE" },
  { prefix: '".WMV"', comment: "Format", filter: "UPLOAD_DATE" },
  {
    prefix: '".FLAC"',
    comment: "Format, Copyright music",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: '".WAV"',
    comment: "Format, User-created music",
    filter: "UPLOAD_DATE",
  },
  { prefix: "Recording gvo", comment: "Zoom", filter: "UPLOAD_DATE" },
  { prefix: "Lv 0", comment: "Misc", filter: "UPLOAD_DATE" },
  { prefix: "bmdjAAAF", comment: "Misc", filter: "UPLOAD_DATE" },
  {
    prefix: "YouCut ",
    getSuffix: () => randDate(),
    comment: "Misc",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: '"Video "',
    getSuffix: () => randDate(),
    comment: "Misc",
    filter: "UPLOAD_DATE",
  },
  { prefix: '"Copy of Copy of"', comment: "Misc", filter: "UPLOAD_DATE" },
  { prefix: '"Untitled video"', comment: "Misc", filter: "UPLOAD_DATE" },
  {
    prefix: '"Com Oculus Vrshell"',
    comment: "VR Headset",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: '"Com Oculus Metacam"',
    comment: "VR Headset",
    filter: "UPLOAD_DATE",
  },
  {
    prefix: "Desktop ",
    getSuffix: () => randDate({ pattern: "YYYY MM DD" }),
    comment: "Game Capture",
    filter: "UPLOAD_DATE",
  },
];

interface Query {
  query: string;
  comment?: string;
  filter?: Filter;
}
const generateQuery = (): Query => {
  const randIndex = Math.floor(Math.random() * patterns.length);
  // const randIndex = patterns.findIndex((p) => p.prefix === "240p 400k");
  const { prefix, getSuffix, comment, filter } = patterns[randIndex];
  const query = getSuffix ? `${prefix}${getSuffix()}` : prefix;
  return { query, comment, filter };
};

const updateLinkElement = ({ query, comment, filter }: Query): void => {
  const url = new URL("https://www.youtube.com/results");
  url.searchParams.set("search_query", query.replace(/ /g, "+"));

  if (filter === "PLAYLIST") {
    url.searchParams.set("sp", "EgIQAw%253D%253D");
  }
  if (filter === "UPLOAD_DATE") {
    url.searchParams.set("sp", "CAI%253D");
  }

  url.search = decodeURIComponent(url.search);
  linkElement.setAttribute("href", url.href);
  linkElement.textContent = `${query}${comment ? ` (${comment})` : ""}`;
};

generateButton.addEventListener("click", () =>
  updateLinkElement(generateQuery())
);
