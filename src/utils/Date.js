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
export { Dateformat, StringDateformat, EndDateformat };