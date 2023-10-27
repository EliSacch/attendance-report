/**
 * This function is used to generate the csv for download
 * @param {Array} data 
 * @param {String} total 
 * @returns 
 */
export function get_csv(name, total, data) {
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(data[0])
    const csv = [
        name, total,
        header.join(','), // header row first
        ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')),
        
    ].join('\r\n')

    return csv;
}