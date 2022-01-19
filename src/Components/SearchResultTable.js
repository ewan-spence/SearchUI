import { isNullOrUndefined, isObject } from '@syncfusion/ej2-base';
import Table from 'react-bootstrap/Table';

function SearchResultTable({ sections, results, ...rest }) {
    return sections.map(resultType => {
        var resultsOfType = results[resultType.toLowerCase()]
        if (resultsOfType === undefined || resultsOfType.length === 0) {
            return null;
        } else {
            return <Table bordered hover>
                <thead>
                    <tr>{resultType}</tr>
                    <tr>
                        {Object.keys(resultsOfType[0]).map(field => {
                            if (isObject(resultsOfType[0][field])) return null;
                            if (isNullOrUndefined(resultsOfType[0][field])) return null;
                            if (field === "id") return null;

                            return <td>{formatFieldName(field)}</td>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {resultsOfType.map(result => {
                        return <tr>
                            {Object.values(result).map((value, index) => {
                                if (isObject(value)) return null;
                                if (isNullOrUndefined(value)) return null;
                                if (Object.keys(result)[index] === "id") return null;

                                return <td>{value}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </Table>
        }
    });
}

function formatFieldName(stringField) {
    var words = stringField.match(/[A-Za-z][a-z]*|[0-9]+/g) || []

    return words.map(capitalize).join(" ");
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

export default SearchResultTable;