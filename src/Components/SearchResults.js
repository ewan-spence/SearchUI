import { useSelector } from 'react-redux';
import { selectResults } from '../App/resultsSlice';
import SearchResultTable from './SearchResultTable';

function SearchResults({ sections, tableStyle }) {
    const results = useSelector(selectResults);

    const resultsPerPage = 15;

    return sections.map(resultType => {
        var resultsOfType = results[resultType.toLowerCase()]
        if (resultsOfType === undefined || resultsOfType.length === 0) {
            return null;
        } else {
            return <SearchResultTable resultType={resultType} resultsOfType={resultsOfType} tableStyle={tableStyle} resultsPerPage={resultsPerPage} />
        }
    });
}


export default SearchResults;