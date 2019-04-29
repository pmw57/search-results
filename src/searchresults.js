/*jslint browser */
import utils from "./utils";
import createCategories from "./createcategories";
import checkboxList from "./checkboxlist";
import createResults from "./createresults";
import resultsController from "./resultscontroller";
import filterCheckboxes from "./filtercheckboxesbytext";

const categoriesSelector = "#categories";
const searchFormSelector = "#search";
const searchFieldSelector = "#categorysearch";

function uncheckCheckboxHandler(evt) {
    const value = resultsController.getName(evt.target);
    checkboxList.uncheckByValue(value);
}
function toggleResultHandler(evt) {
    const checkbox = evt.target;
    const result = document.querySelector("#" + checkbox.value);
    resultsController.toggle(result, checkbox.checked);
}
function clearAllClickHandler() {
    const searchField = document.querySelector(searchFieldSelector);
    searchField.value = "";
    utils.keyUp(searchField);
    checkboxList.reset();
    searchField.focus();
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    checkboxList.checkFirst();
}
function initSearchResults() {
    const search = document.querySelector(searchFieldSelector);
    const categories = document.querySelector(categoriesSelector);
    filterCheckboxes(categories, search);
    checkboxList.init();
    checkboxList.addCheckboxEvent("click", toggleResultHandler);
    resultsController.init();
    resultsController.addClosebuttonsEvent("click", uncheckCheckboxHandler);
    const searchForm = document.querySelector(searchFormSelector);
    searchForm.addEventListener("submit", formSubmitHandler);
    resultsController.addClearallEvent("click", clearAllClickHandler);
}
function init(catData) {
    const search = document.querySelector(searchFormSelector);
    const categorySection = createCategories.init(catData, search);
    createResults.init(catData, categorySection);
    initSearchResults();
}
export default Object.freeze({
    init
});
