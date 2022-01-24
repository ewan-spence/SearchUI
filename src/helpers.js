
export function formatFieldName(stringField) {
    var words = stringField.match(/[A-Za-z][a-z]*|[0-9]+/g) || []

    return words.map(capitalize).join(" ");
}

export function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

export function formatMoney(valueString) {
    var splitOnDecimal = valueString.toString().split('.');
    var pounds = splitOnDecimal[0];
    var pence = splitOnDecimal[1];

    if (pence === undefined) {
        pence = "00";
    } else {
        pence = pence.substring(0, 2);
    }

    return `£${pounds.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${pence}`;
}