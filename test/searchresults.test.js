/*jslint browser*/
import sandbox from "./sandbox";
import catData from "../config/categories.json";
import utils from "../src/utils";
import createCategories from "../src/createcategories";
import createResults from "../src/createresults";
import resultsController from "../src/resultscontroller";
import searchResults from "../src/searchresults";

const describe = window.describe;
const it = window.it;
const expect = window.expect;

const resultSelector = ".result";
const sandpitHtml = "<form id='search'>" +
        "<p><input type='text' id='categorysearch' " +
        "    name='searchresultstest'></p>" +
        "</form>" +
        "<div id='categories'>" +
        "  <p><input type='checkbox' id='chk0' " +
        "    value='result0'>" +
        "    <label for='chk0'>Fruit</label></p>" +
        "</div>" +
        "<p id='clearAll'>Results:" +
        "  <button class='clearAll'>Clear all results</button>" +
        "</p>" +
        "<div id='results'>" +
        "  <div class='result' id='result0'>" +
        "    <div class='sidebar'><button class='close'>X</button></div>" +
        "  </div>" +
        "</div>";
describe("Search results", function () {
    let sandpit;
    let categorySearch;
    let categories;
    let clearAllButton;
    window.beforeEach(function () {
        sandpit = sandbox.init({
            html: sandpitHtml,
            visible: false
        });
        categorySearch = sandpit.querySelector("#categorysearch");
        clearAllButton = sandpit.querySelector("#clearAll");
        searchResults.init(catData);
        categories = sandpit.querySelector("#categories");
    });
    window.afterEach(function () {
        sandbox.removeAll();
    });
    it("initializes createCategories", function () {
        window.spyOn(createCategories, "init");
        searchResults.init();
        expect(createCategories.init).toHaveBeenCalled();
    });
    it("initializes createResults", function () {
        window.spyOn(createResults, "init");
        searchResults.init();
        expect(createResults.init).toHaveBeenCalled();
    });
    it("uses a search filter", function () {
        const paras = categories.querySelectorAll("p");
        const visible = (paras) => Array.from(paras).filter(utils.isVisible);
        expect(visible(paras).length).toBe(paras.length);
        categorySearch.value = "fru";
        utils.keyUp(categorySearch);
        expect(visible(paras).length).toBe(1);
    });
    it("shows a result when a category is selected", function () {
        const item = categories.querySelector("input");
        const results = document.querySelectorAll(resultSelector);
        expect(utils.hasVisible(results)).toBe(false);
        item.click();
        expect(utils.hasVisible(results)).toBe(true);
    });
    it("hides a result when a category is deselected", function () {
        const item = categories.querySelector("input");
        const results = document.querySelectorAll(resultSelector);
        item.click();
        expect(utils.hasVisible(results)).toBe(true);
        item.click();
        expect(utils.hasVisible(results)).toBe(false);
    });
    it("can submit the selected categories", function () {
        const input = sandpit.querySelector("input");
        const item = categories.querySelector("input");
        input.value = "F";
        expect(item.checked).toBe(false);
        utils.submit(input.form);
        expect(item.checked).toBe(true);
    });
    it("cleans up when closing by unclicking the category", function () {
        const item = categories.querySelector("input");
        const close = sandpit.querySelector("#results button");
        item.click();
        expect(item.checked).toBe(true);
        close.click();
        expect(item.checked).toBe(false);
    });
    it("Empties the search field when clearing all", function () {
        categorySearch.value = "fru";
        clearAllButton.click();
        expect(categorySearch.value).toBe("");
    });
    it("gives focus to the search field when clearing all", function () {
        const item = categories.querySelector("input");
        item.click();
        clearAllButton.click();
        expect(document.activeElement).toBe(categorySearch);
    });
    it("shows all the categories when clearing all", function () {
        const items = categories.querySelectorAll("input");
        categorySearch.value = "zxc";
        utils.keyUp(categorySearch);
        expect(utils.getVisible(items).length).toBe(0);
        clearAllButton.click();
        expect(utils.getVisible(items).length).toBeGreaterThan(0);
    });
    // regression test for when button toggles the results twice over.
    it("clearAll clears all of the results", function () {
        const item = categories.querySelector("input");
        const results = sandpit.querySelectorAll(resultSelector);
        item.click();
        expect(utils.hasVisible(results)).toBe(true);
        clearAllButton.click();
        expect(utils.hasVisible(results)).toBe(false);
    });
});
