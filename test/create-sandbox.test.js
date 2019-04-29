/*jslint browser*/
import sandbox from "./create-sandbox";

const describe = window.describe;
const it = window.it;
const expect = window.expect;

describe("Create-sandbox", function () {
    it("can create a sandbox", function () {
        const sandpit = sandbox.create("createsandboxtest");
        expect(sandpit.querySelector("#categories")).toBeDefined();
    });
});