/*jslint browser */
import mustache from "mustache";

function renewCategories(categories, search) {
    const div = document.createElement("div");
    div.id = "categories";
    if (categories) {
        const beforeCategories = categories.previousElementSibling;
        categories.remove();
        beforeCategories.insertAdjacentElement("afterend", div);
    } else {
        const p = document.createElement("p");
        p.appendChild(document.createTextNode("Categories to toggle"));
        search.insertAdjacentElement("afterend", p);
        p.insertAdjacentElement("afterend", div);
    }
    return div;
}
function init(catData, search) {
    const template = document.querySelector("#category-template");
    if (!template) {
        return;
    }

    function categoryReducer(html, catInfo, index) {
        const view = {
            category: {
                index: index,
                title: catInfo.title
            }
        };
        return html + mustache.render(template.innerHTML, view);
    }

    const categories = document.querySelector("#categories");
    const templateCategories = renewCategories(categories, search);
    templateCategories.innerHTML = catData.reduce(categoryReducer, "");
}
export default Object.freeze({
    init
});
