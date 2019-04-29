/*jslint browser*/
import sandbox from "./sandbox";
import catData from "../config/categories.json";
import createCategories from "../src/createcategories";

const describe = window.describe;
const it = window.it;
const expect = window.expect;

describe("Create categories", function () {
    let sandpit;
    let search;
    let categories;
    window.beforeEach(function () {
        sandpit = sandbox.init({
            html: "<form id='search'></form>" +
                    "<p>Categories to toggle</p>" +
                    "<div id='categories'>" +
                    "<script id='category-template' " +
                    "    type='x-tmpl-mustache'>" +
                    "{{#category}}" +
                    "  <p><input type='checkbox' id='chk{{index}}' " +
                    "    value='result{{index}}'>" +
                    "    <label for='chk{{index}}'>{{title}}</label></p>" +
                    "{{/category}}" +
                    "</script>" +
                    "</div>",
            visible: false
        });
        search = sandpit.querySelector("#search");
    });
    window.afterEach(function () {
        sandbox.removeAll();
    });
    describe("when init'd", function () {
        window.beforeEach(function () {
            createCategories.init(catData);
            categories = document.querySelector("#categories");
        });
        it("adds the categories section to the search field", function () {
            const title = search.nextElementSibling;
            categories = title.nextElementSibling;
            expect(categories.id).toBe("categories");
        });
        it("adds paragraphs for each category", function () {
            expect(categories.querySelectorAll("p").length).toBe(4);
        });
        it("adds an input to each paragraph", function () {
            expect(categories.querySelectorAll("input").length).toBe(4);
        });
        it("has an input with type and value", function () {
            const input = categories.querySelector("p input");
            expect(input.getAttribute("type")).toBe("checkbox");
            expect(input.getAttribute("value").length).toBeGreaterThan(1);
        });
        it("has a label with a name", function () {
            const label = categories.querySelector("p label");
            const name = catData[0].title;
            expect(label.innerText).toBe(name);
        });
        it("has matching id and for values", function () {
            const input = categories.querySelector("p input");
            const label = categories.querySelector("p label");
            const idAttr = input.getAttribute("id");
            const forAttr = label.getAttribute("for");
            const els = document.querySelectorAll("[id=" + idAttr + "]");
            expect(idAttr.substr(0, 3)).toBe("chk");
            expect(els.length).toBe(1);
            expect(forAttr).toBe(idAttr);
        });
    });
});
