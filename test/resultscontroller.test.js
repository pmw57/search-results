/*jslint browser*/
import sandbox from "./sandbox";
import utils from "../src/utils";
import resultsController from "../src/resultscontroller";

const describe = window.describe;
const it = window.it;
const expect = window.expect;

describe("Results controller", function () {
    let sandpit;
    let clearAllButton;
    window.beforeEach(function () {
        sandpit = sandbox.init({
            html: "<p id='clearAll'>Results:" +
                    "  <button class='clearAll'>Clear all results</button>" +
                    "</p>" +
                    "<div id='results'>" +
                    "  <div class='result' id='Fruits'>" +
                    "    <div class='sidebar'>" +
                    "      <button class='close'>X</button>" +
                    "    </div>" +
                    "    <div class='content'>" +
                    "      <span class='myspan1'>Fruits</span>" +
                    "    </div>" +
                    "  </div>" +
                    "  <div class='result' id='Vegetables'>" +
                    "    <div class='sidebar'>" +
                    "      <button class='close'>X</button>" +
                    "    </div>" +
                    "    <div class='content'>" +
                    "      <span class='myspan1'>Vegetables</span>" +
                    "    </div>" +
                    "  </div>" +
                    "</div>",
            visible: false
        });
        resultsController.init();
        clearAllButton = sandpit.querySelector("#clearAll");
    });
    window.afterEach(function () {
        sandbox.removeAll();
    });
    describe("updates the results", function () {
        it("can show a result", function () {
            const id = "Fruits";
            const result = sandpit.querySelector("#" + id);
            const results = sandpit.querySelectorAll(".result");
            expect(utils.hasVisible(results)).toBe(false);
            resultsController.toggle(result, true);
            expect(utils.hasVisible(results)).toBe(true);
        });
        it("can hide a result", function () {
            const id = "Fruits";
            const result = sandpit.querySelector("#" + id);
            const results = sandpit.querySelectorAll(".result");
            const item = sandpit.querySelector("#" + id);
            item.classList.remove("hide");
            expect(utils.hasVisible(results)).toBe(true);
            resultsController.toggle(result, false);
            expect(utils.hasVisible(results)).toBe(false);
        });
    });
    it("closes a result when the close button is clicked", function () {
        const item = sandpit.querySelector("#Fruits");
        item.classList.remove("hide");
        expect(item.classList).not.toContain("hide");
        item.querySelector(".close", item).click();
        expect(item.classList).toContain("hide");
    });
    it("shows the clearAll button when results shown", function () {
        const id = "Fruits";
        const result = sandpit.querySelector("#" + id);
        resultsController.toggle(result, true);
        expect(utils.isVisible(clearAllButton)).toBe(true);
        resultsController.toggle(result, false);
        expect(utils.isVisible(clearAllButton)).toBe(false);
    });
    it("clearAll clears all of the results", function () {
        const id = "Fruits";
        const result = sandpit.querySelector("#" + id);
        const results = sandpit.querySelectorAll(".result");
        resultsController.toggle(result, true);
        expect(utils.hasVisible(results)).toBe(true);
        clearAllButton.click();
        expect(utils.hasVisible(results)).toBe(false);
    });
});
