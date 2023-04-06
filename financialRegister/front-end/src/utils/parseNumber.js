function parseNumber(number) {
    number = Math.round(number * 100) / 100;
    let numberDecimal = "";
    if (String(number).split(".").length > 1) {
        numberDecimal = String(number).split(".")[1];
        if (numberDecimal.length === 1) {
        numberDecimal += "0";
        }
    } else {
        numberDecimal = "00";
    }

    let numberEntire = String(number).split(".")[0];
    if (isNaN(numberEntire) || numberEntire === "") {
        numberEntire = "0";
    }
    number = numberEntire + "." + numberDecimal;
    return number;
};

export default parseNumber;