/*jslint browser */
import utils from "./utils";
import scroll from "./scroll";

function hasScrollContainerAsParent(item) {
    const scrollContainer = scroll.getScrollContainer(item);
    return scrollContainer === item.parentNode;
}
function upToScrollChild(item) {
    let container = item;
    while (
        !hasScrollContainerAsParent(container) &&
        container.nodeName !== "HTML"
    ) {
        container = container.parentNode;
    }
    return container;
}
function scrollTo(item) {
    scroll.intoView(item);
}
function getFocusableFrom(container) {
    return container.querySelectorAll(
        "button, [href], input, select, textarea, " +
        "[tabindex]:not([tabindex='-1'])"
    );
}
function setFocused(item) {
    const focusable = getFocusableFrom(item);
    if (focusable) {
        focusable[0].focus();
    }
}
function moveTo(item) {
    item = upToScrollChild(item);
    scrollTo(item);
    setFocused(item);
}
function moveToGivenDirection(item, getElFunc) {
    let scrollChild = item;
    if (!hasScrollContainerAsParent(item)) {
        scrollChild = upToScrollChild(item);
    }
    scrollChild = getElFunc(scrollChild);
    if (!scrollChild) {
        scrollChild = item;
    }
    moveTo(scrollChild);
}
function moveToPrevious(item) {
    moveToGivenDirection(item, function getPrev(item) {
        return utils.visibleSiblings(item, "prev")[0];
    });
}
function moveToNext(item) {
    return moveToGivenDirection(item, function getNext(item) {
        return utils.visibleSiblings(item, "next")[0];
    });
}
function isScrollParent(el) {
    const scrollParent = scroll.getScrollContainer(el);
    return el.parentNode === scrollParent;
}
function getContainerChild(item) {
    let container = item;
    while (!isScrollParent(container) && container.nodeName !== "HTML") {
        container = container.parentNode;
    }
    return container;
}
function createInsideAboveFilter(item, scrollHeight) {
    const container = getContainerChild(item);
    return function scrollViewFilter(child) {
        const dist = scroll.outerDistanceBetween(container, child);
        return dist > 0 && dist < scrollHeight;
    };
}
function createInsideBelowFilter(item, scrollHeight) {
    const container = getContainerChild(item);
    return function scrollViewFilter(child) {
        const dist = scroll.outerDistanceBetween(child, container);
        return dist > 0 && dist < scrollHeight;
    };
}
function getPageUpItem(item) {
    const container = scroll.getScrollContainer(item);
    const items = Array.from(container.children);
    const scrollHeight = scroll.innerHeight(container);
    const scrollViewFilter = createInsideAboveFilter(item, scrollHeight);
    const filteredItems = items.filter(scrollViewFilter);
    return filteredItems[0];
}
function getPageDownItem(item) {
    const container = scroll.getScrollContainer(item);
    const items = Array.from(container.children);
    const scrollHeight = scroll.innerHeight(container);
    const scrollViewFilter = createInsideBelowFilter(item, scrollHeight);
    const filteredItems = items.filter(scrollViewFilter);
    return filteredItems.pop();
}
function pageUpFrom(item) {
    item = getPageUpItem(item);
    return moveTo(item);
}
function pageDownFrom(item) {
    item = getPageDownItem(item);
    return moveTo(item);
}
function moveToStart(item) {
    let scrollChild;
    if (!hasScrollContainerAsParent(item)) {
        scrollChild = upToScrollChild(item);
    }
    scrollChild = utils.visibleSiblings(scrollChild, "prev").pop();
    if (!scrollChild) {
        scrollChild = item;
    }
    return moveTo(scrollChild);
}
function moveToEnd(item) {
    let scrollChild;
    if (!hasScrollContainerAsParent(item)) {
        scrollChild = upToScrollChild(item);
    }
    scrollChild = utils.visibleSiblings(scrollChild, "next").pop();
    if (!scrollChild) {
        scrollChild = item;
    }
    return moveTo(scrollChild);
}
function keydownHandler(evt) {
    const item = evt.target;
    if (evt.key === "PageUp") {
        pageUpFrom(item);
        evt.preventDefault();
    }
    if (evt.key === "PageDown") {
        pageDownFrom(item);
        evt.preventDefault();
    }
    if (evt.key === "End") {
        moveToEnd(item);
        evt.preventDefault();
    }
    if (evt.key === "Home") {
        moveToStart(item);
        evt.preventDefault();
    }
    if (evt.key === "ArrowUp") {
        moveToPrevious(item);
        evt.preventDefault();
    }
    if (evt.key === "ArrowDown") {
        moveToNext(item);
        evt.preventDefault();
    }
}
export default Object.freeze({
    keydownHandler,
    moveTo
});
