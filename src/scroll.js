/*jslint browser */

function innerHeight(item) {
    const style = window.getComputedStyle(item);
    return parseInt(style.height);
}
function scrollUpDifference(item, container) {
    const offsetFromContainerTop = item.offsetTop - container.offsetTop;
    const desiredOffset = innerHeight(container) - item.offsetHeight;
    return offsetFromContainerTop - desiredOffset;
}
function scrollUpTo(item, container) {
    const offsetDifference = scrollUpDifference(item, container);
    container.scrollTop = container.scrollTop + offsetDifference;
}
function scrollDownDifference(item, container) {
    const containerScroll = container.scrollTop + container.offsetTop;
    return item.offsetTop - containerScroll;
}
function scrollDownTo(item, container) {
    const offsetDifference = scrollDownDifference(item, container);
    container.scrollTop = container.scrollTop + offsetDifference;
}
function isScrollable(item) {
    const style = window.getComputedStyle(item);
    return (
        style.overflow === "scroll" ||
        style.overflow === "auto" ||
        style.overflowX === "scroll" ||
        style.overflowX === "auto" ||
        style.overflowY === "scroll" ||
        style.overflowY === "auto"
    );
}
function getScrollContainer(item) {
    let parent = item.parentNode;
    while (!isScrollable(parent) && parent.nodeName !== "HTML") {
        parent = parent.parentNode;
    }
    return parent;
}
function outerHeight(item) {
    return item.offsetHeight;
}
function intoView(item) {
    const container = getScrollContainer(item);
    if (scrollUpDifference(item, container) > 0) {
        scrollUpTo(item, container);
    }
    if (scrollDownDifference(item, container) < 0) {
        scrollDownTo(item, container);
    }
}
function distanceBetween(item1, item2) {
    return item1.offsetTop - item2.offsetTop;
}
function outerDistanceBetween(item1, item2) {
    const dist = distanceBetween(item1, item2);
    return (
        dist >= 0
        ? dist + outerHeight(item1)
        : dist + outerHeight(item2)
    );
}
export default Object.freeze({
    intoView,
    outerDistanceBetween,
    innerHeight,
    getScrollContainer
});
