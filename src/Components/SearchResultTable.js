import { isNullOrUndefined, isObject } from '@syncfusion/ej2-base';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { add } from '../App/resultsSlice';
import { useSearchMutation } from '../App/searchApi';

import { capitalize, formatFieldName, formatMoney } from '../helpers';
import FullPagination from './FullPagination';


function SearchResultTable({ search, resultType, resultsOfType, resultsPerPage, totalResults }) {

    var totalPages = Math.ceil(totalResults / resultsPerPage);

    const [active, setActive] = useState(1);

    const [trigger] = useSearchMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        var searchPaginationObject = {
            search: search,
            itemsPerPage: resultsPerPage,
            page: active
        }

        trigger(searchPaginationObject)
            .unwrap()
            .then(response => {
                var payload = {
                    resultType: resultType.toLowerCase(),
                    data: {
                        documents: response[resultType.toLowerCase()],
                        noDocuments: response.totalResults
                    }
                };

                console.log(payload);

                dispatch(add(payload));
            })
    }, [active, dispatch, resultType, resultsPerPage, search, trigger]);

    return <div>
        <h3>{resultType}</h3>

        <Table bordered hover>
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
                {resultsOfType.map(result => {
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
        {console.log(resultType, totalPages)}
        <FullPagination totalPages={totalPages} activePage={active} setActivePage={setActive} />
    </div>
}

export default SearchResultTable;