import { validate_in_out_time } from "./validation.js";

/**
 * This function is used to calculate the total hoours
 * @param {String} In 
 * @param {String} Out 
 * @returns 
 */
export function calculate_hours(In, Out) {
    const timeIn = In.split(":").map(t => parseInt(t));
    const timeOut = Out.split(":").map(t => parseInt(t));

    if (timeIn.includes(NaN) || timeOut.includes(NaN) || timeIn.length != 2 || timeOut.length != 2) {
        throw ("There was an error calculating the time");
    } else {
        return validate_in_out_time(timeIn, timeOut);
    }
}
