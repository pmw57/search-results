/*jslint browser */
import mustache from "mustache";

function renewResults(results, parent) {
    // If the element section exists, it needs to be removed and recreated.
    // Just emptying the section is not good enough, as that
    // can leave behind unwanted things like event handlers.
    if (results) {
        results.remove();
    }
    results = document.createElement("div");
    results.id = "results";
    parent.insertAdjacentElement("afterend", results);
    return results;
}
function init(catData) {
    const template = document.querySelector("#result-template");
    if (!template) {
        return;
    }
    function resultReducer(html, catInfo, index) {
        const view = {
            results: {
                index: index,
                title: catInfo.title,
                food: catInfo.items
            }
        };
        return html + mustache.render(template.innerHTML, view);
    }

    const clearAll = document.querySelector("#clearAll");
    const results = document.querySelector("#results");
    const templateResults = renewResults(results, clearAll);
    templateResults.innerHTML = catData.reduce(resultReducer, "");
}
export default Object.freeze({
    init
});
