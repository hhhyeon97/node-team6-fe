const StartDate = (date) => {
    const [year, month, day] = date.split('.');
    const formattedDate = `${year}.${parseInt(month)}.${parseInt(day)}`;
    return formattedDate;
}

const EndDate = (date) => {
    const [year, month, day] = date.split('.');
    const formattedDate = `${parseInt(month)}.${parseInt(day)}`;
    return formattedDate;
}

const DateChangeToNum = (date) => {
    const [year, month, day] = date.split('.');
    const formattedDate = `${year}${month}${day}`
    return formattedDate
}

export {StartDate, EndDate, DateChangeToNum};