/*jslint browser */
import utils from "./utils";
import scrollManager from "./scrollmanager";

const categoriesSelector = "#categories";
const checkboxSelector = "input[type=checkbox]";

function getCheckboxByValue(value) {
    return document.querySelector("input[value=" + value + "]");
}
function uncheckByValue(value) {
    const checkbox = getCheckboxByValue(value);
    if (checkbox.checked) {
        checkbox.click();
    }
}
// We can't just set the checkbox checked value to true.
// Other things also need to occur that are triggered by the click event.
// Because of that, we need to click on the checkbox instead.
function checkFirst() {
    const categories = document.querySelector(categoriesSelector);
    const checkboxes = categories.querySelectorAll(checkboxSelector);
    const firstCheckbox = utils.getVisible(checkboxes)[0];
    if (!firstCheckbox.checked) {
        firstCheckbox.click();
    }
    firstCheckbox.focus();
}
function reset() {
    const categories = document.querySelector(categoriesSelector);
    const inputs = categories.querySelectorAll(checkboxSelector);
    const checkedInputs = Array.from(inputs).filter((input) => input.checked);
    checkedInputs.forEach((input) => input.click());
}
function addCheckboxEvent(type, handler) {
    const categories = document.querySelector(categoriesSelector);
    categories.addEventListener(type, function checkboxFilter(evt) {
        const el = evt.target;
        if (el.matches(checkboxSelector)) {
            handler(evt);
        }
    });
}
function init() {
    const categories = document.querySelector(categoriesSelector);
    categories.addEventListener("keydown", scrollManager.keydownHandler);
}
export default Object.freeze({
    addCheckboxEvent,
    uncheckByValue,
    checkFirst,
    reset,
    init
});
