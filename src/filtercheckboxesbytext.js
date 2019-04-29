/*jslint browser */
import escapeRegExp from "escape-regexp";

function filterCheckboxesByText(container, searchField) {
    function containsText(haystack, needle) {
        return needle.toLowerCase().indexOf(haystack.toLowerCase()) > -1;
    }
    function caseInsensitiveBold(text, search) {
        const searchRx = new RegExp("(" + escapeRegExp(search) + ")", "gi");
        return text.replace(searchRx, "<b>$1</b>");
    }
    function highlightMatches(search, container) {
        container.querySelectorAll("label").forEach(function (label) {
            label.innerHTML = caseInsensitiveBold(label.innerText, search);
        });
    }
    function showItem(checkbox) {
        const parent = checkbox.parentNode;
        parent.style.display = "";
        parent.classList.remove("hide");
    }

    searchField.addEventListener("keyup", function searchHandler(evt) {
        const searchValue = evt.target.value;

        function compareWithSearch(checkbox) {
            const label = checkbox.nextElementSibling;
            return containsText(searchValue, label.innerText);
        }

        Array.from(container.querySelectorAll("p")).forEach(
            (para) => para.classList.add("hide")
        );
        const checkboxes = container.querySelectorAll("input[type=checkbox]");
        Array.from(checkboxes).filter(compareWithSearch).forEach(showItem);
        highlightMatches(searchValue, container);
    });
}

export default Object.freeze(filterCheckboxesByText);