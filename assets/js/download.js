/**
 * This function is used to generate the csv for download
 * @param {Array} data 
 * @param {String} total 
 * @returns 
 */
export function get_csv(total, data) {
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(data[0])
    const csv = [
        header.join(','), // header row first
        ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')),
        ",,,," + total.split(': ').join(','),
    ].join('\r\n');
    return encodeURIComponent(csv);
}


/**
 * This function dowloads the csv
 * @param {String} filename 
 * @param {csv} csvData 
 */
export function download_csv(filename, csvData) {
    // create element
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/csv;charset=utf-8,${csvData}`);
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    // click
    element.click();
    // remove element
    document.body.removeChild(element);
}
