document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("add").addEventListener("click", e => add_line(e));
    display_rows();
});


/**
 * This function gets the form data and returns just the values as array
 * @returns Array
 */
function get_row_values() {
    const form = document.forms["time-form"]
    return [form["date"].value,
    form["type"].value,
    form["time-in"].value,
    form["time-out"].value
    ]
}


/**
 * This function is used to calculate the total hoours
 * @param {String} In 
 * @param {String} Out 
 * @returns 
 */
function calculate_hours(In, Out) {
    const timeIn = In.split(":").map(t => parseInt(t));
    const timeOut = Out.split(":").map(t => parseInt(t));

    // calculate difference
    const absDiff = ((timeOut[0]*60)+timeOut[1]) - ((timeIn[0]*60)+timeIn[1]);
    const hourDiff = Math.floor(Math.abs(absDiff/60));
    const minDiff = Math.abs(absDiff%60);

    // get result as string
    let actual = `${hourDiff}:${minDiff<10?("0"+minDiff) : minDiff}`
    let charged = minDiff<10 ? (
        `${hourDiff}:00`
    ) : (
        `${hourDiff+1}:00`
    );
    if (absDiff < 0) {
        actual = "-"+actual;
        charged = "-"+charged;
    };

    return [actual, charged]
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
    for (let i=0; i< body.length; i+=columns) {
        const tr = document.createElement("tr");
        const row = body.slice(i, i+columns);
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
    const newRow = get_row_values();
    const hoursCount = calculate_hours(newRow[2], newRow[3])
    alert(hoursCount);
    update_rows(newRow.concat(hoursCount));
    display_rows();
}
