/*jslint browser*/
import sandbox from "./sandbox";
import catData from "../config/categories.json";
import createResults from "../src/createresults";

const describe = window.describe;
const it = window.it;
const expect = window.expect;

describe("Create results", function () {
    let sandpit;
    window.beforeEach(function () {
        sandpit = sandbox.init({
            html: "<form id='search'></form>" +
                    "<div id='categories'></div>" +
                    "<p id='clearAll'></p>" +
                    "<script id='result-template' type='x-tmpl-mustache'>" +
                    "{{#results}}" +
                    "<ol>" +
                    "  {{#food}}" +
                    "  <li>{{name}}</li>" +
                    "{{/food}}" +
                    "</ol>" +
                    "{{/results}}" +
                    "</script>"
        });
    });
    window.afterEach(function () {
        sandbox.removeAll();
    });
    it("removes pre-existing results sections", function () {
        sandpit.innerHTML += "<div id='results'></div>";
        const results = sandpit.querySelector("#results");
        expect(results.parentNode).not.toBeNull();
        createResults.init(catData);
        expect(results.parentNode).toBeNull();
    });
    it("doesn't error when results doesn't exist", function () {
        const results = document.querySelector("#results");
        expect(results).toBeNull();
        createResults.init(catData);
        const createdResults = document.querySelector("#results");
        expect(createdResults).not.toBeNull();
    });
    describe("when init'd", function () {
        let clearAll;
        let results;
        window.beforeEach(function () {
            createResults.init(catData);
            clearAll = sandpit.querySelector("#clearAll");
            results = clearAll.nextSibling;
        });
        it("adds the results section below the clearAll section", function () {
            clearAll = sandpit.querySelector("#clearAll");
            expect(clearAll.nextSibling.id).toBe("results");
        });
        it("shows results", function () {
            const result = results.children[0];
            const item = result.querySelector("li");
            expect(item.innerText).toBe("Apples");
        });
    });
});
