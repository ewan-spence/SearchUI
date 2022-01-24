import { isNullOrUndefined, isObject } from '@syncfusion/ej2-base';
import moment from 'moment';
import Table from 'react-bootstrap/Table';

import { useSelector } from 'react-redux';
import { selectResults } from '../App/resultsSlice';
import { capitalize, formatFieldName, formatMoney } from '../helpers';

function SearchResultTable({ sections, tableStyle }) {
    const results = useSelector(selectResults);

    return sections.map(resultType => {
        var resultsOfType = results[resultType.toLowerCase()]
        if (resultsOfType === undefined || resultsOfType.length === 0) {
            return null;
        } else {
            return (<div>
                <h3>{resultType}</h3>

                <Table style={tableStyle} bordered hover>
                    <thead>
                        <tr>
                            {Object.keys(resultsOfType[0]).map(field => {
                                if (isObject(resultsOfType[0][field])) {
                                    var fieldName = (field.toLowerCase() === "portfolio") ? "Value" : "Name"

                                    return <td>{capitalize(field)} {fieldName}</td>
                                }
                                if (isNullOrUndefined(resultsOfType[0][field])) return null;
                                if (field.toLowerCase().includes("id")) return null;

                                return <td>{formatFieldName(field)}</td>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {resultsOfType.slice(0, 20).map(result => {
                            return <tr>
                                {Object.values(result).map((value, index) => {

                                    // Only show the name field of embedded objects
                                    if (isObject(value)) {
                                        if (value["name"] === undefined) {
                                            return <td>{formatMoney(value["value"])}</td>
                                        } else {
                                            return <td>{value["name"]}</td>;
                                        }
                                    }

                                    // Ignore any null values
                                    if (isNullOrUndefined(value)) return null;

                                    // Ignore hard-to-read IDs
                                    if (Object.keys(result)[index].toLowerCase().includes("id")) return null;

                                    // Format currency
                                    if (!isNaN(value) && !isNaN(parseFloat(value))) return <td>{formatMoney(value)}</td>;

                                    // Format dates in a readable way
                                    if (moment(value, moment.ISO_8601, true).isValid()) {
                                        var dateValue = new Date(value);
                                        return <td>{dateValue.toLocaleDateString()} {dateValue.toLocaleTimeString()}</td>;
                                    }

                                    return <td>{value}</td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>)
        }
    });
}


export default SearchResultTable;