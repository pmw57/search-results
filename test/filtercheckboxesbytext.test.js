/*jslint browser */
import sandbox from "./sandbox";
import utils from "../src/utils";
import filterCheckboxes from "../src/filtercheckboxesbytext";

const describe = window.describe;
const it = window.it;
const expect = window.expect;

describe("Filter checkboxes by text", function () {
    let sandpit;
    let categories;

    window.beforeEach(function () {
        sandpit = sandbox.init({
            html: "<p><input type='text'></p>" +
                    "<div id='categories'>" +
                    "  <p>" +
                    "    <input id='One' type='checkbox' value='One'>" +
                    "    <label for='One'>One</label>" +
                    "  </p>" +
                    "  <p>" +
                    "    <input id='Two' type='checkbox' value='Two'>" +
                    "    <label for='Two'>Two</label>" +
                    "  </p>" +
                    "  <p>" +
                    "    <input id='Three' type='checkbox' value='Three'>" +
                    "    <label for='Three'>Three</label>" +
                    "  </p>" +
                    "</div>",
            visible: false
        });
        categories = sandpit.querySelector("#categories");
    });
    window.afterEach(function () {
        sandbox.removeAll();
    });
    function keyUp(el, key) {
        const event = document.createEvent("Event");
        const bubbles = true;
        const cancelable = true;
        event.keyCode = key;
        event.initEvent("keyup", bubbles, cancelable);
        el.dispatchEvent(event);
    }
    it("Hides matching elements when triggered by a keyup event", function () {
        const input = sandpit.querySelector("input");
        filterCheckboxes(categories, input);
        input.value = "o";
        keyUp(input);
        const paras = categories.querySelectorAll("p");
        expect(utils.getVisible(paras).length).toBe(2);
    });
    it("Hides other elements when showing different ones", function () {
        const input = sandpit.querySelector("input");
        const paras = categories.querySelectorAll("p");
        const labels = categories.querySelectorAll("label");
        filterCheckboxes(categories, input);
        input.value = "w";
        keyUp(input);
        expect(utils.hasVisible(paras)).toBe(true);
        expect(utils.getVisible(labels)[0].innerText).toBe("Two");
        input.value = "r";
        keyUp(input);
        expect(utils.hasVisible(paras)).toBe(true);
        expect(utils.getVisible(labels)[0].innerText).toBe("Three");
    });
    it("Changes the label to bold matching chars", function () {
        const input = sandpit.querySelector("input");
        const labels = categories.querySelectorAll("label");
        filterCheckboxes(categories, input);
        input.value = "tw";
        keyUp(input);
        expect(utils.getVisible(labels)[0].innerHTML).toBe("<b>Tw</b>o");
    });
    it("Doesn't filter when the change event is fired", function () {
        const input = sandpit.querySelector("input");
        const labels = categories.querySelectorAll("label");
        filterCheckboxes(categories, input);
        document.querySelector("#sandbox input").focus();
        input.value = "O";
        utils.keyUp(input, "O");
        expect(utils.getVisible(labels)[0].innerHTML).toBe("<b>O</b>ne");
        input.value = "On";
        utils.change(input);
        expect(utils.getVisible(labels)[0].innerHTML).toBe("<b>O</b>ne");
    });
});