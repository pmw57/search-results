/*jslint browser */
import utils from "./utils";

const resultsSelector = "#results";
const resultSelector = ".result";
const closeSelector = ".close";
const clearAllSelector = "#clearAll";

function toggle(result, shouldShow) {
    const clearAll = document.querySelector(clearAllSelector);
    result.classList.toggle("hide", !shouldShow);
    const results = document.querySelectorAll(resultSelector);
    const hasResults = utils.hasVisible(results);
    clearAll.classList.toggle("hide", !hasResults);
}
function getName(button) {
    let parent = button.parentNode;
    while (!parent.classList.contains("result") && parent.nodeName !== "HTML") {
        parent = parent.parentNode;
    }
    return parent.id;
}
function addClosebuttonsEvent(type, handler) {
    const results = document.querySelector(resultsSelector);

    function buttonFilterHandler(evt) {
        const targ = evt.target;
        if (targ.matches(closeSelector)) {
            handler(evt);
        }
    }
    results.addEventListener(type, buttonFilterHandler);
}
function closeClickHandler(evt) {
    const button = evt.target;
    const id = getName(button);
    const result = document.querySelector("#" + id);
    result.classList.add("hide");
}
function addClearallEvent(type, handler) {
    const clearAll = document.querySelector(clearAllSelector);
    clearAll.addEventListener(type, handler);
}
function clearAllClickHandler() {
    const results = document.querySelectorAll(resultSelector);
    results.forEach((result) => result.classList.add("hide"));
}
function init() {
    const result = document.querySelectorAll(resultSelector);
    result.forEach((result) => result.classList.add("hide"));
    addClosebuttonsEvent("click", closeClickHandler);

    const clearAll = document.querySelector(clearAllSelector);
    clearAll.classList.add("hide");
    addClearallEvent("click", clearAllClickHandler);
}
export default Object.freeze({
    addClosebuttonsEvent,
    addClearallEvent,
    getName,
    toggle,
    init
});
