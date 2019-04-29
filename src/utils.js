/*jslint browser */
function isVisible(el) {
    return el.offsetParent !== null;
}
function getVisible(els) {
    return Array.from(els).filter(isVisible);
}
function hasVisible(els) {
    return getVisible(els).length > 0;
}
function getSiblings(el, type) {
    const siblings = [];
    const siblingType = (
        type === "prev"
        ? "previousElementSibling"
        : "nextElementSibling"
    );
    el = el[siblingType];
    while (el) {
        siblings.push(el);
        el = el[siblingType];
    }
    return siblings;
}
function visibleSiblings(container, direction) {
    const els = getSiblings(container, direction);
    return Array.from(els).filter((el) => el).filter(isVisible);
}
function createEvent(el, eventType, params) {
    const event = document.createEvent("Event");
    const bubbles = true;
    const cancelable = true;
    Object.assign(event, params);
    event.initEvent(eventType, bubbles, cancelable);
    el.dispatchEvent(event);
}
function keyUp(el, key) {
    createEvent(el, "keyup", {key: key});
}
function keyDown(el, key) {
    createEvent(el, "keydown", {key: key});
}
function change(el) {
    createEvent(el, "change");
}
function submit(el) {
    createEvent(el, "submit");
}
export default Object.freeze({
    isVisible,
    getVisible,
    hasVisible,
    getSiblings,
    visibleSiblings,
    keyUp,
    keyDown,
    change,
    submit
});