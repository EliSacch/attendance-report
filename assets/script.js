document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("add").addEventListener("click", e => add_line(e));
    display_rows();
});


/**
 * This function is used to display error messages
 * @param {String} err 
 */
function display_error(err) {
    const msg = document.createTextNode(err);
    const errorDiv = document.getElementById("error");
    errorDiv.appendChild(msg);
    setTimeout(
        () => errorDiv.removeChild(msg), 3000
    );
}


/**
 * This function is used to validate the form
 * @param {HTMLFormElement} form
 * @param {Array} requiredFields
 */
function validate_form(form, requiredFields) {
    for (let field of requiredFields) {
        if (form[field].value == "") {
            throw (`Missing required field "${field}"`)
        }
    }
    return true
}


/**
 * This function gets the form data and returns just the values as array
 * @returns Array
 */
function get_row_values() {
    const form = document.forms["time-form"];
    const requiredFields = ["date", "type", "time-in", "time-out"];
    if (validate_form(form, requiredFields)) {
        return requiredFields.map(field => form[field].value)
    }
}


/**
 * This function is used to validate the time inputs
 * @param {Array} timeIn 
 * @param {Array} timeOut 
 * @returns 
 */
function validate_in_out_time(timeIn, timeOut) {
    // calculate difference
    const absDiff = ((timeOut[0] * 60) + timeOut[1]) - ((timeIn[0] * 60) + timeIn[1]);
    
    if (absDiff < 0) {
        throw ("Leave time should be after Arrival time.")
    } else {
        const hourDiff = Math.floor(absDiff / 60);
        const minDiff = absDiff % 60;

        // get result as string
        let actual = `${hourDiff}:${minDiff < 10 ? ("0" + minDiff) : minDiff}`;
        let charged = minDiff < 10 ? (
            `${hourDiff}:00`
        ) : (
            `${hourDiff + 1}:00`
        );
        return [actual, charged]
    }
}


/**
 * This function is used to calculate the total hoours
 * @param {String} In 
 * @param {String} Out 
 * @returns 
 */
function calculate_hours(In, Out) {
    timeIn = In.split(":").map(t => parseInt(t));
    timeOut = Out.split(":").map(t => parseInt(t));

    if (timeIn.includes(NaN) || timeOut.includes(NaN) || timeIn.length != 2 || timeOut.length != 2) {
        throw ("There was an error calculating the time");
    } else {
        return validate_in_out_time(timeIn, timeOut);
    }
}


/**
 * This function gets the data for the new row
 * and it adds it to local storage.
 * @param {Array} newRow 
 */
function update_rows(newRow) {
    let existingRows = localStorage.getItem("rows")
    const header = ["date", "type", "time-in", "time-out", "actual", "charged"]
    if (existingRows === null) {
        localStorage.setItem("rows", header.concat(newRow))
    } else {
        localStorage.setItem("rows", existingRows.split(",").concat(newRow))
    }
}


/**
 * This function converts the data in localStorage from String
 * to a readable table.
 * @param {String} existingRows 
 * @returns HTML table
 */
function create_table(existingRows) {
    const columns = 6;
    const headers = existingRows.split(",").slice(0, columns);
    let body = existingRows.split(",").slice(columns);

    // create table
    const table = document.createElement("table");
    // create header
    const thead = document.createElement("thead");
    const thr = document.createElement("tr");
    for (let header of headers) {
        let th = document.createElement("th");
        th.append(document.createTextNode(header));
        thr.appendChild(th)
    }
    thead.appendChild(thr)
    table.appendChild(thead)

    // create body
    const tbody = document.createElement("tbody");
    for (let i = 0; i < body.length; i += columns) {
        const tr = document.createElement("tr");
        const row = body.slice(i, i + columns);
        for (let data of row) {
            let td = document.createElement("td");
            td.append(document.createTextNode(data));
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
    table.appendChild(tbody);
    // return table
    return table
}


/**
 * This function gets the data from the local storage,
 * and displays it in the result div.
 */
function display_rows() {
    const resultDiv = document.getElementById("result");
    let existingRows = localStorage.getItem("rows")
    if (existingRows != null) {
        resultDiv.innerHTML = '';
        resultDiv.appendChild(create_table(existingRows));
    }
}


/**
 * This function handles the click event for the add button.
 * It creates a new row for the new data entered.
 * @param {click} e 
 */
const add_line = e => {
    e.preventDefault();
    try {
        const newRow = get_row_values();
        const hoursCount = calculate_hours(newRow[2], newRow[3]);
        update_rows(newRow.concat(hoursCount));
    } catch (err) {
        display_error(err);
    }
    display_rows();
}
