const Dateformat = (value) => {
    if (value) {
        const date = value

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        // 월은 0부터 시작하므로 +1, padStart는 2자리를 기준으로 1자리만 들어오면 0으로 채우겠다는 의미

        const formattedDate = `${year}년 ${month}월 ${day}일`;

        return formattedDate
    }
}

const StringDateformat = (value) => {
    if (value) {
        const date = value

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}${month}${day}`;

        return formattedDate
    }
}

const EndDateformat = (value) => {
    if (value) {

        const date = value

        const year = date.getFullYear()
        const month = String(date.getMonth() + 3).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}${month}${day}`;

        return formattedDate
    }

}

const convertToKST = (utcDate) => {
    if (utcDate) {

        const date = new Date(utcDate);
        const kstOffset = 9 * 60 * 60 * 1000; // UTC+9
        const kstDate = new Date(date.getTime() + kstOffset);
        kstDate.toISOString().replace('T', ' ').substring(0, 19); // 한국 시간 형식으로 변경

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}.${month}.${day}`;

        return formattedDate
    }
    return null
};

const numformat = (text) => {
    const numbers = text.match(/\d+/g).join('');
    const numericValue = Number(numbers);
    return numericValue;
};

const priceformat = (number) => {
    return number.toLocaleString();
};

const cc_expires_format = (string) => {
    return string
        .replace(
            /[^0-9]/g,
            "" // To allow only numbers
        )
        .replace(
            /^([2-9])$/g,
            "0$1" // To handle 3 > 03
        )
        .replace(
            /^(1{1})([3-9]{1})$/g,
            "0$1/$2" // 13 > 01/3
        )
        .replace(
            /^0{1,}/g,
            "0" // To handle 00 > 0
        )
        .replace(
            /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
            "$1/$2" // To handle 113 > 11/3
        );
};

export {
    Dateformat, StringDateformat, EndDateformat,
    convertToKST, numformat, priceformat,
    cc_expires_format
};