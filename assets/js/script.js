import { update_rows, get_row_values, get_name, calculate_total } from './data.js';
import { calculate_hours } from './utilities.js';
import { display_message, display_rows } from './dom.js';
import { get_csv, download_csv } from './download.js';


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("add").addEventListener("click", e => add_line(e));
    document.getElementById("download-form").addEventListener("submit", e => download(e));
    document.getElementById("download-form-small").addEventListener("submit", e => download(e));
    document.getElementById("date").valueAsDate = new Date();
    document.getElementById("time-in").defaultValue = `${new Date().getHours()}:00`;
    document.getElementById("time-out").defaultValue = `${new Date().getHours() + 1}:00`;
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
        update_rows({ ...newRow, ...hoursCount });
        display_message("Data added", "success");
    } catch (err) {
        display_message(err, "error");
    }
    display_rows();
}


/**
 * This function handles the click event for the download button.
 * It converts the data to csv and downloads the file.
 * @param {click} e 
 */
const download = e => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("rows"));
    const total = calculate_total(data);
    const form = e.target;
    try {
        const name = get_name(form);
        const csvData = get_csv(total, data);
        download_csv(name, csvData);
    } catch (err) {
        display_message(err, "error");
    }
}