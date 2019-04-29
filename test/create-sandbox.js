/*jslint browser */
import sandbox from "./sandbox";

sandbox.create = function (name) {
    return sandbox.init({
        html: "<p><input type='text' id='categorysearch' name='createsandbox'></p>" +
        "<div id='categories'>" +
          "<p>" +
            "<input type='checkbox' id='chkxFruits' value='Fruits'>" +
            "<label for='chkxFruits'>xFruits</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkxVegetables' value='Vegetables'>" +
            "<label for='chkxVegetables'>xVegetables</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkxNuts' value='Nuts'>" +
            "<label for='chkxNuts'>xNuts</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkxMeats' value='Meats'>" +
            "<label for='chkxMeats'>xMeats</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkFruits2' value='Fruits2'>" +
            "<label for='chkFruits2'>Fruits2</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkVegetables2' value='Vegetables2'>" +
            "<label for='chkVegetables2'>Vegetables2</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkNuts2' value='Nuts2'>" +
            "<label for='chkNuts2'>Nuts2</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkMeats2' value='Meats2'>" +
            "<label for='chkMeats2'>Meats2</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkFruits3' value='Fruits3'>" +
            "<label for='chkFruits3'>Fruits3</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkVegetables3' value='Vegetables3'>" +
            "<label for='chkVegetables3'>Vegetables3</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkNuts3' value='Nuts3'>" +
            "<label for='chkNuts3'>Nuts3</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkMeats3' value='Meats3'>" +
            "<label for='chkMeats3'>Meats3</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkFruits21' value='Fruits21'>" +
            "<label for='chkFruits21'>Fruits21</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox'" +
              "id='chkVegetables21' value='Vegetables21'>" +
            "<label for='chkVegetables21'>Vegetables21</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkNuts21' value='Nuts21'>" +
            "<label for='chkNuts21'>Nuts21</label>" +
          "</p>" +
          "<p>" +
            "<input type='checkbox' id='chkMeats21' value='Meats21'>" +
            "<label for='chkMeats21'>Meats21</label>" +
          "</p>" +
        "</div>",
        visible: false
    });
};

export default sandbox;