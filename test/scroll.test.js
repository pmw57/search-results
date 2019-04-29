/*jslint browser */
import sandbox from "./create-sandbox";
import scroll from "../src/scroll";

const describe = window.describe;
const it = window.it;
const expect = window.expect;

describe("Scroll", function () {
    let sandpit;
    let categories;
    let items;
    window.beforeEach(function () {
        sandpit = sandbox.create("scrolltest");
        categories = sandpit.querySelector("#categories");
        items = categories.children;
    });
    window.afterEach(function () {
        sandbox.removeAll();
    });
    describe("scroll into view", function () {
        it("doesn't scroll if an element is already in view", function () {
            const item = items[0];
            categories.scrollTop = 0;
            scroll.intoView(item);
            expect(categories.scrollTop).toBe(0);
        });
        it("scrolls down when an element is above", function () {
            const item = items[0];
            categories.scrollTop = categories.scrollHeight;
            scroll.intoView(item);
            expect(categories.scrollTop).toBe(0);
        });
        it("scrolls up if an element is below", function () {
            const lastItem = items[items.length - 1];
            categories.scrollTop = 0;
            scroll.intoView(lastItem);
            expect(categories.scrollTop).toBeGreaterThan(0);
        });
    });
    it("gets the scroll container", function () {
        const item = items[0];
        const scrollContainer = scroll.getScrollContainer(item);
        expect(scrollContainer).toEqual(categories);
    });
    it("has a positive inner height", function () {
        const innerHeight = scroll.innerHeight(categories);
        expect(innerHeight).toBeGreaterThan(0);
    });
    it("has an inner height smaller than the scroll height", function () {
        const innerHeight = scroll.innerHeight(categories);
        expect(innerHeight).not.toBeGreaterThan(categories.scrollHeight);
    });
    it("gets the distance between two neighboring elements", function () {
        const item1 = items[0];
        const item2 = items[1];
        const distance = scroll.outerDistanceBetween(item1, item2);
        expect(distance).not.toBeGreaterThan(1);
    });
    it("gets the distance between two separated elements", function () {
        const item1 = items[0];
        const item2 = items[1];
        const item3 = items[2];
        const distance = scroll.outerDistanceBetween(item1, item3);
        const gap = scroll.outerDistanceBetween(item1, item2);
        expect(distance).toBeCloseTo(-item1.offsetHeight - gap, 0);
    });
});