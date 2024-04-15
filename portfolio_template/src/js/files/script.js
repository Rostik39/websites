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
    "Figma",
    "Animations",
    "npm",
    "Responsive",
];
const options = {
    containerClass: "tag-cloud",
    itemClass: "tag",
    radius: 200,
    direction: 225,
    initSpeed: "normal",
    maxSpeed: "normal"
};

let tagCloud = TagCloud(container, texts, options);
let showTagCloud = false;

function handleResize() {
    // Check if the screen width is less than 768 pixels
    if (window.innerWidth < 991.98 && showTagCloud==false) {
        // Execute tagcloud.destroy() if the condition is true
        tagCloud.destroy();
        populateSkillsList();
        showTagCloud=true;
    } else if (window.innerWidth >= 991.98 && showTagCloud==true) {
        // Handle other cases if needed
        clearSkillsContainer();
        tagCloud = TagCloud(container, texts, options);
        showTagCloud=false;
    }
    let navigationItem = document.querySelector('.menu__link[data-goto=".me"]');
    if (navigationItem.classList.contains('_navigator-active')) {
        let animationItem = document.querySelector('.menu__body');
        animationItem.classList.add('animateUp');

    } else {
    }

}

function populateSkillsList() {
    const container = document.querySelector('.skills__container');

    // Create ul element with class skills__list
    const ul = document.createElement('ul');
    ul.classList.add('skills__list');

    // Loop through the texts array and create li elements with class skills__item and add text to them
    texts.forEach(text => {
        const li = document.createElement('li');
        li.classList.add('skills__item');
        li.textContent = text;
        ul.appendChild(li);
    });

    // Append the ul element to the container
    container.appendChild(ul);
}

function clearSkillsContainer() {
    const container = document.querySelector('.skills__container');
    // Remove all child elements of the container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// Add event listener for the resize event
window.addEventListener('resize', handleResize);

handleResize();


