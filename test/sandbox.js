/*jslint browser */
function addSandbox(html, isVisible) {
    const div = document.createElement("div");
    div.id = "sandbox";
    div.style.marginLeft = isVisible
        ? 0
        : "-9999px";
    div.innerHTML = html;
    return document.body.appendChild(div);
}
function removeAll() {
    document.querySelectorAll("#sandbox").forEach(function (sandpit) {
        sandpit.remove();
    });
}
function initSandpit(opts) {
    const initHtml = (opts && opts.html) || "";
    const isVisible = (opts && opts.visible) || false;
    return addSandbox(initHtml, isVisible);
}
export default {
    init: initSandpit,
    removeAll: removeAll
};
