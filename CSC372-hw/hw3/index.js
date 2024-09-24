let asideSections = document.querySelectorAll("aside > section");
let articleSections = document.querySelectorAll("article > section");

for (let i = 0; i < asideSections.length; i++) {
    let section = asideSections[i];

    section.addEventListener("click", (event) => {
        extendSection(event);
    });
    section.setAttribute("id", "s" + i);
};

/**
 * 
 * @param {Event} event 
 */
function extendSection(event) {
    let targetId = new String(event.currentTarget.id);
    let target = document.getElementById(targetId);
    let idNum = Number.parseInt(targetId.slice(1));

    let targetArticleSec = articleSections.item(idNum);
    targetArticleSec.classList.toggle("extend");
}