import { update_rows, get_row_values } from './data.js';
import { calculate_hours } from './utilities.js';
import { display_error, display_rows } from './dom.js';


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("add").addEventListener("click", e => add_line(e));
    display_rows();
});


/**
 * This function handles the click event for the add button.
 * It creates a new row for the new data entered.
 * @param {click} e 
 */
const add_line = e => {
    e.preventDefault();
    try {
        const newRow = get_row_values();
        const hoursCount = calculate_hours(newRow["time-in"], newRow["time-out"]);
        update_rows({...newRow, ...hoursCount});
    } catch (err) {
        display_error(err);
    }
    display_rows();
}
