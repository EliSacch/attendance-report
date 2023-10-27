import { validate_form } from './validation.js';
import { display_rows } from './dom.js';

/**
 * This function gets the data for the new row
 * and it adds it to local storage.
 * @param {Array} newRow 
 */
export function update_rows(newRow) {
    let rows = JSON.parse(localStorage.getItem("rows"));
    if (rows === null) {
        localStorage.setItem("rows", JSON.stringify([newRow]));
    } else {
        rows.push(newRow)
        localStorage.setItem("rows", JSON.stringify(rows));
    }
}


/**
 * This function gets the form data and returns just the values as array
 * @returns Array
 */
export function get_row_values() {
    const form = document.forms["time-form"];
    const requiredFields = ["date", "type", "time-in", "time-out"];
    if (validate_form(form, requiredFields)) {
        return requiredFields.reduce(
            (a,b) => {
                a[`${b}`] = form[`${b}`].value;
                return a
            }, {}
        )
    }
}


/**
 * This function is used to delete a row from the table and
 * the respective data from local storage.
 * @param {Integer} index 
 */
export function delete_row(index) {
    let rows = JSON.parse(localStorage.getItem("rows"));
    rows.splice(index, 1);
    rows.length > 0 ? localStorage.setItem("rows", JSON.stringify(rows)) : localStorage.removeItem("rows");
    display_rows();
}


/**
 * This function clears all data from local storage.
 */
export function clear_all() {
    localStorage.removeItem("rows");
    display_rows();
}
