export const dateFormat = (currentDate) => {
    const date = new Date(currentDate * 1000);
    const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];

    return `${dateFormatAddZero(day)}/${dateFormatAddZero(month)}/${year}`;
}

const dateFormatAddZero = (value) => {
    return (value < 10 ? "0" : "") + value
}