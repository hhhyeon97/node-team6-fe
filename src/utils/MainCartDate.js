const StartDate = (date) => {
    const [year, month, day] = date.split(".");
    const formattedDate = `${year}.${parseInt(month)}.${parseInt(day)}`;
    return formattedDate;
}

const EndDate = (date) => {
    const [year, month, day] = date.split(".");
    const formattedDate = `${parseInt(month)}.${parseInt(day)}`;
    return formattedDate;
}

const DateChangeToNum = (date) => {
    const [year, month, day] = date.split(".");
    const formattedDate = `${year}${month}${day}`
    return formattedDate
}

const DateToReturn = (date) => {
    const parts = date.split('.');
    const year = parts[0];
    const month = parts[1].padStart(2,0);
    const day = parts[2].padStart(2,0);
    const formattedDate = `${year}${month}${day}`
    return formattedDate
}

export {StartDate, EndDate, DateChangeToNum, DateToReturn};