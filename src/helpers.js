
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

export function range(start, stop, step) {
    console.log(start, stop, [start]);
    if (start === stop) return [start];
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
}