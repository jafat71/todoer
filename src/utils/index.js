/* eslint-disable no-unused-vars */
export const getDifferenceBetweenDates= (fromDate, toDate) => {
    let diff = 0
    try {
        diff = Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24));
    } catch (error) {
        diff = 0
    } 
    return diff
}

