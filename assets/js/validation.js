/**
 * This function is used to validate the time inputs
 * @param {Array} In 
 * @param {Array} Out 
 * @returns 
 */
export function validate_in_out_time(In, Out) {
    // calculate difference
    const absDiff = ((Out[0] * 60) + Out[1]) - ((In[0] * 60) + In[1]);
    
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
 * This function is used to validate the form
 * @param {HTMLFormElement} form
 * @param {Array} requiredFields
 */
export function validate_form(form, requiredFields) {
    for (let field of requiredFields) {
        if (form[field].value == "") {
            throw (`Missing required field "${field}"`)
        }
    }
    return true
}