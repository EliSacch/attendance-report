import { validate_form } from './validation.js';
import { display_rows } from './dom.js';

/**
 * This function gets the data for the new row
 * and it adds it to local storage.
 * @param {Array} newRow 
 */
export function update_rows(newRow) {
    let existingRows = localStorage.getItem("rows");
    const header = ["date", "type", "time-in", "time-out", "actual", "charged"];
    if (existingRows === null) {
        localStorage.setItem("rows", header.concat(newRow));
    } else {
        localStorage.setItem("rows", existingRows.split(",").concat(newRow));
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
        return requiredFields.map(field => form[field].value);
    }
}


/**
 * This function is used to delete a row from the table and
 * the respective data from local storage.
 * @param {Integer} index 
 */
export function delete_row(index) {
    let rows = localStorage.getItem("rows").split(",");
    rows.splice(index+6, 6);
    rows.length > 6 ? localStorage.setItem("rows", rows) : localStorage.removeItem("rows");
    display_rows();
}


/**
 * This function clears all data from local storage.
 */
export function clear_all() {
    localStorage.removeItem("rows");
    display_rows();
}