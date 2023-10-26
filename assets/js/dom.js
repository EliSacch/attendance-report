/**
 * This function is used to display error messages
 * @param {String} err 
 */
export function display_error(err) {
    const msg = document.createTextNode(err);
    const errorDiv = document.getElementById("error");
    errorDiv.appendChild(msg);
    setTimeout(
        () => errorDiv.removeChild(msg), 3000
    );
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
export function display_rows() {
    const resultDiv = document.getElementById("result");
    let existingRows = localStorage.getItem("rows")
    if (existingRows != null) {
        resultDiv.innerHTML = '';
        resultDiv.appendChild(create_table(existingRows));
    }
}