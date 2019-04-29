/*jslint browser */
import sandbox from "./create-sandbox";
import scrollManager from "../src/scrollmanager";

const describe = window.describe;
const it = window.it;
const expect = window.expect;

describe("Scroll manager", function () {
    let sandpit;
    let categories;
    let items;

    function makeDummyEvt(opts) {
        const dummyEvt = {
            preventDefault: function () {
                return;
            }
        };
        return Object.assign(opts, dummyEvt);
    }
    function issueItemKeyCommand(target, key) {
        const evt = makeDummyEvt({
            target: target,
            key: key
        });
        scrollManager.keydownHandler(evt);
        return document.activeElement;
    }

    window.beforeEach(function () {
        sandpit = sandbox.create("scrollmanagertest");
        categories = sandpit.querySelector("#categories");
        items = categories.children;
    });
    window.afterEach(function () {
        sandbox.removeAll();
    });
    describe("arrows", function () {
        it("arrows up to the previous element", function () {
            const lastItem = items[items.length - 1].querySelector("input");
            const prevItem = items[items.length - 2].querySelector("input");
            const evt = makeDummyEvt({
                target: lastItem,
                key: "ArrowUp"
            });
            scrollManager.keydownHandler(evt);
            const item = document.activeElement;
            expect(item.id).toBe(prevItem.id);
        });
        it("doesn't arrow up from the first element", function () {
            const firstItem = items[0].querySelector("input");
            const item = issueItemKeyCommand(firstItem, "ArrowUp");
            expect(item.id).toBe(firstItem.id);
        });
        it("arrows down to the next item", function () {
            const firstItem = items[0].querySelector("input");
            const prevItem = items[1].querySelector("input");
            const item = issueItemKeyCommand(firstItem, "ArrowDown");
            expect(item.id).toBe(prevItem.id);
        });
        it("doesn't arrow down from the last visible element", function () {
            const lastItem = items[items.length - 1].querySelector("input");
            const item = issueItemKeyCommand(lastItem, "ArrowDown");
            expect(item.id).toBe(lastItem.id);
        });
        it("skips down over hidden items", function () {
            items[1].setAttribute("style", "display: none");
            const firstItem = items[0].querySelector("input");
            const thirdItem = items[2].querySelector("input");
            const item = issueItemKeyCommand(firstItem, "ArrowDown");
            expect(item.id).toBe(thirdItem.id);
        });
        it("skips up over hidden items", function () {
            const secondItem = items[1].querySelector("input");
            items[2].setAttribute("style", "display: none");
            const thirdItem = items[3].querySelector("input");
            const item = issueItemKeyCommand(thirdItem, "ArrowUp");
            expect(item.id).toBe(secondItem.id);
        });
        it("does nothing when going up to hidden elements", function () {
            const secondItem = items[1].querySelector("input");
            items[0].setAttribute("style", "display: none");
            const item = issueItemKeyCommand(secondItem, "ArrowUp");
            expect(item.id).toBe(secondItem.id);
        });
    });
    describe("home and end", function () {
        it("selects the last item in the list", function () {
            const firstItem = items[0].querySelector("input");
            const lastItem = items[items.length - 1].querySelector("input");
            const item = issueItemKeyCommand(firstItem, "End");
            expect(item.id).toBe(lastItem.id);
        });
        it("moves to the end of the list", function () {
            const firstItem = items[0].querySelector("input");
            const scrollLen = categories.scrollHeight - categories.offsetHeight;
            categories.scrollTop = 0;
            issueItemKeyCommand(firstItem, "End");
            expect(scrollLen - categories.scrollTop).toBeLessThan(2);
        });
        it("does nothing when you are already at the end", function () {
            const lastItem = items[items.length - 1].querySelector("input");
            const item = issueItemKeyCommand(lastItem, "End");
            expect(item.id).toBe(lastItem.id);
        });
        it("selects the first item in the list", function () {
            const firstItem = items[0].querySelector("input");
            const lastItem = issueItemKeyCommand(firstItem, "End");
            const item = issueItemKeyCommand(lastItem, "Home");
            expect(item.id).toBe(firstItem.id);
        });
        it("goes home to the start", function () {
            const firstItem = items[0].querySelector("input");
            const lastItem = issueItemKeyCommand(firstItem, "End");
            expect(categories.scrollTop).not.toBe(0);
            issueItemKeyCommand(lastItem, "Home");
            expect(categories.scrollTop).toBe(0);
        });
        it("does nothing when you are already at the start", function () {
            const firstItem = items[0].querySelector("input");
            const item = issueItemKeyCommand(firstItem, "Home");
            expect(item.id).toBe(firstItem.id);
        });
    });
    describe("page up and page down", function () {
        it("moves the page down focus instead of scrolling", function () {
            const firstItem = items[0].querySelector("input");
            const pageDownItem = issueItemKeyCommand(firstItem, "PageDown");
            expect(pageDownItem.id).not.toBe(firstItem.id);
        });
        it("scrolls when page down focus is at the top", function () {
            const firstItem = items[0].querySelector("input");
            const pageDownItem = issueItemKeyCommand(firstItem, "PageDown");
            issueItemKeyCommand(pageDownItem, "PageDown");
            expect(categories.scrollTop).toBeGreaterThan(0);
        });
        it("moves the page up focus instead of scrolling", function () {
            const firstItem = items[items.length - 1].querySelector("input");
            const endItem = issueItemKeyCommand(firstItem, "End");
            const pageUpItem = issueItemKeyCommand(endItem, "PageUp");
            expect(pageUpItem.id).not.toBe(endItem.id);
        });
        it("scrolls when the page up focus is at the bottom", function () {
            const firstItem = items[items.length - 1].querySelector("input");
            const endItem = issueItemKeyCommand(firstItem, "End");
            const scrollLen = categories.scrollHeight - categories.offsetHeight;
            const pageUpItem = issueItemKeyCommand(endItem, "PageUp");
            issueItemKeyCommand(pageUpItem, "PageUp");
            expect(categories.scrollTop).toBeGreaterThan(0);
            expect(categories.scrollTop).toBeLessThan(scrollLen);
        });
    });
});