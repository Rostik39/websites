// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import TagCloud from "TagCloud";

const container = ".skills__container";
const texts = [
    "HTML",
    "CSS",
    "SCSS",
    "JavaScript",
    "figma",
    "animations",
    "npm",
    "responsive",
];
const options = {
  containerClass: "tag-cloud",
  itemClass: "tag",
  radius: 250,
  direction: 225,
  initSpeed: "fast",
  maxSpeed: "normal"
};

TagCloud(container, texts, options);

