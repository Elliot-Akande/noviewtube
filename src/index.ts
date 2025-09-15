import "./styles.css";

const generateButton = document.querySelector(".generate");
const linkElement = document.querySelector(".link");

const generate = () => {
  const rand = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0");
  const query = `IMG ${rand}`;
  const link = `https://www.youtube.com/results?search_query=${query.replace(
    / /g,
    "+"
  )}`;

  linkElement.setAttribute("href", link);
  linkElement.textContent = query;
};

generateButton.addEventListener("click", generate);
