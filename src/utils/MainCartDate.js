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

export {StartDate, EndDate};