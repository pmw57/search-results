/*jslint browser */
import sandbox from "./sandbox";
import utils from "../src/utils";
import checkboxList from "../src/checkboxlist";

const describe = window.describe;
const it = window.it;
const expect = window.expect;

describe("Checkbox list", function () {
    let sandpit;
    let categories;
    let items;
    let labels;

    window.beforeEach(function () {
        sandpit = sandbox.init({
            html: "<p><input type='text'></p>" +
                    "<div id='categories'>" +
                    "<p>" +
                    "<input id='One' type='checkbox' value='One'>" +
                    "<label for='One'>One</label>" +
                    "</p>" +
                    "<p>" +
                    "<input id='Two' type='checkbox' value='Two'>" +
                    "<label for='Two'>Two</label>" +
                    "</p>" +
                    "<p>" +
                    "<input id='Three' type='checkbox' value='Three'>" +
                    "<label for='Three'>Three</label>" +
                    "</p>" +
                    "</div>",
            visible: true
        });
        categories = sandpit.querySelector("#categories");
        items = categories.querySelectorAll("input");
        labels = categories.querySelectorAll("label");
        checkboxList.init();
    });
    window.afterEach(function () {
        sandbox.removeAll();
    });
    it("gives the value of the checkbox", function () {
        const checkbox = items[0];
        const id = checkbox.value;
        expect(id).toBe("One");
    });
    it("selects the clicked category item", function () {
        labels[0].click();
        expect(document.activeElement).toBe(items[0]);
        labels[1].click();
        expect(document.activeElement).toBe(items[1]);
    });
    it("selects the clicked bold category item", function () {
        labels[0].innerHTML = "<b>" + labels[0].innerHTML + "</b>";
        labels[0].querySelector("b").click();
        expect(document.activeElement).toBe(items[0]);
    });
    it("checks the first checkbox", function () {
        expect(items[0].checked).toBe(false);
        expect(items[1].checked).toBe(false);
        expect(items[2].checked).toBe(false);
        checkboxList.checkFirst();
        expect(items[0].checked).toBe(true);
        expect(items[1].checked).toBe(false);
        expect(items[2].checked).toBe(false);
    });
    it("checks the first available checkbox", function () {
        items[0].style.display = "none";
        items[1].style.display = "none";
        expect(items[0].checked).toBe(false);
        expect(items[1].checked).toBe(false);
        expect(items[2].checked).toBe(false);
        checkboxList.checkFirst();
        expect(items[0].checked).toBe(false);
        expect(items[1].checked).toBe(false);
        expect(items[2].checked).toBe(true);
    });
    it("doesn't uncheck a checked checkbox", function () {
        labels[0].click();
        expect(items[0].checked).toBe(true);
        checkboxList.checkFirst();
        expect(items[0].checked).toBe(true);
    });
    it("unchecks a checkbox by finding its value property", function () {
        const value = items[0].value;
        items[0].click();
        expect(items[0].checked).toBe(true);
        checkboxList.uncheckByValue(value);
        expect(items[0].checked).toBe(false);
    });
    it("uses a keydown handler", function () {
        const label = categories.querySelector("label");
        label.click();
        const previouslyActive = document.activeElement;
        utils.keyDown(label, "ArrowDown");
        expect(document.activeElement).not.toBe(previouslyActive);
    });
    it("resets selected checkboxes back to unchecked", function () {
        items[0].checked = true;
        items[1].checked = true;
        checkboxList.reset();
        expect(items[0].checked).toBe(false);
        expect(items[1].checked).toBe(false);
    });
});