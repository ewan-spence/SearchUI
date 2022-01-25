import { useSelector } from 'react-redux';
import { selectResults } from '../App/resultsSlice';
import SearchResultTable from './SearchResultTable';

function SearchResults({ sections, tableStyle }) {
    const results = useSelector(selectResults);
    const resultsDocs = results.documents;
    const resultsNumbers = results.noDocuments;

    const resultsPerPage = 15;

    return sections.map(resultType => {
        var resultsOfType = resultsDocs[resultType.toLowerCase()]
        var noResultsOfType = resultsNumbers[resultType.toLowerCase()]

        console.log(resultsOfType);
        if (resultsOfType === undefined || resultsOfType.length === 0) {
            return null;
        } else {
            return <SearchResultTable resultType={resultType} resultsOfType={resultsOfType} tableStyle={tableStyle} resultsPerPage={resultsPerPage} totalResults={noResultsOfType} />
        }
    });
}


export default SearchResults;