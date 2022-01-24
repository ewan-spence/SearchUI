
export function formatFieldName(stringField) {
    var words = stringField.match(/[A-Za-z][a-z]*|[0-9]+/g) || []

    return words.map(capitalize).join(" ");
}

export function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

export function formatMoney(valueString) {
    return "£".concat(valueString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}