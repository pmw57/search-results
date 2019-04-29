/*jslint browser*/
import sandbox from "./sandbox";

const describe = window.describe;
const it = window.it;
const expect = window.expect;

describe("Sandbox", function () {
    it("Accepts an initial condition for the sandbox", function () {
        const html = `<div id="anElement"></div>`;
        const sandpit = sandbox.init({
            html: html
        });
        expect(sandpit.innerHTML).toBe(html);
    });
    it("Removes all sandboxes", function () {
        sandbox.init({html: ""});
        expect(document.querySelectorAll("#sandbox").length).toBeGreaterThan(0);
        sandbox.removeAll();
        expect(document.querySelectorAll("#sandbox").length).toBe(0);
    });
    it("Lets us retrieve elements from within the sandpit", function () {
        const html = `<div id="anElement"></div>`;
        const sandpit = sandbox.init({
            html: html
        });
        expect(sandpit.querySelector("#anElement")).not.toBeNull();
    });
    it("can have a visible sandbox", function () {
        const html = `<div id="anElement"></div>`;
        const sandpit = sandbox.init({
            html: html,
            visible: true
        });
        expect(sandpit.style.marginLeft).toBe("0px");
    });
    it("can have an invisible sandbox", function () {
        const html = `<div id="anElement"></div>`;
        const sandpit = sandbox.init({
            html: html,
            visible: false
        });
        expect(sandpit.style.marginLeft).toBe("-9999px");
    });
    it("defaults to not showing the sandbox", function () {
        const html = `<div id="anElement"></div>`;
        const sandpit = sandbox.init({
            html: html
        });
        expect(sandpit.style.marginLeft).toBe("-9999px");
    });
});
