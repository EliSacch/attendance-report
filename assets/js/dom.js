import { delete_row, clear_all, calculate_total } from "./data.js";

/**
 * This function is used to display error/success messages
 * @param {String} err 
 */
export function display_message(err, type) {
    const msg = document.createTextNode(err);
    const span = document.createElement("span");
    const messages = document.getElementById("messages");
    span.appendChild(msg);
    span.classList.add(type);
    messages.appendChild(span);
    setTimeout(
        () => span.style.opacity = 1, 300
    );
    setTimeout(
        () => span.style.opacity = 0, 4500
    );
    setTimeout(
        () => messages.removeChild(span), 5200
    );
}


/**
 * This function converts the data in localStorage from String
 * to a readable table.
 * @param {String} existingRows 
 * @returns HTML table
 */
function create_table(existingRows) {
    const headers = Object.keys(existingRows[0]);

    // create table
    const table = document.createElement("table");
    // create header
    const thead = document.createElement("thead");
    const thr = document.createElement("tr");
    for (let header of headers) {
        let th = document.createElement("th");
        th.append(document.createTextNode(header));
        thr.appendChild(th);
    }
    // Ad one column for actions
    thr.appendChild(document.createTextNode("Actions"));
    // Append all to the table head
    thead.appendChild(thr);
    table.appendChild(thead);

    // create body
    const tbody = document.createElement("tbody");
    for (let row of existingRows) {
        const tr = document.createElement("tr");
        for (let data of headers) {
            let td = document.createElement("td");
            td.append(document.createTextNode(row[`${data}`]));
            tr.appendChild(td)
        }
        // create delete button
        const btn = document.createElement("button");
        btn.innerText = "Delete";
        const index = existingRows.indexOf(row);
        btn.addEventListener("click", () => delete_row(index));
        btn.setAttribute('data-index', index);
        tr.appendChild(btn);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    return table
}


/**
 * This function is used to display the rows in a table
 * @param {HTMLDivElement} resultDiv 
 * @param {Object} existingRows 
 */
function display_table(resultDiv, existingRows) {
    // table
    resultDiv.appendChild(create_table(JSON.parse(existingRows)));
    // total
    let total = "";
    try {
        total = calculate_total(JSON.parse(existingRows));
    } catch ( err ){
        total = err
    }
    const totalText = document.createTextNode(total);
    const totalPar = document.createElement("p");
    totalPar.appendChild(totalText);
    resultDiv.appendChild(totalPar);
}


/**
 * This function gets the data from the local storage,
 * and displays it in the result div.
 */
export function display_rows() {
    const resultDiv = document.getElementById("result");
    const existingRows = localStorage.getItem("rows");
    resultDiv.innerHTML = '';
    if (existingRows != null) {
        display_table(resultDiv, existingRows);
    } else {
        resultDiv.innerHTML = 'No data entered.';
    }

    // hide elements if there is no result to display
    const clearBtn = document.getElementById("clear-all");
    clearBtn.style.display = existingRows != null ? "block" : "none";
    clearBtn?.addEventListener("click", () => clear_all())
    const downloadSection = document.getElementById("download-section");
    downloadSection.style.display = existingRows != null ? "block" : "none";
}
