import { useSelector } from 'react-redux';
import { selectResults } from '../App/resultsSlice';
import { selectSearch } from '../App/searchSlice';
import SearchResultTable from './SearchResultTable';

function SearchResults({ sections }) {
    const results = useSelector(selectResults);
    const resultsDocs = results.documents;
    const resultsNumbers = results.noDocuments;

    const searchTerms = useSelector(selectSearch);

    const resultsPerPage = 15;

    return sections.map(resultType => {
        var resultsOfType = resultsDocs[resultType.toLowerCase()]
        var noResultsOfType = resultsNumbers[resultType.toLowerCase()]

        var search = searchTerms[resultType.toLowerCase()];

        if (resultsOfType === undefined || resultsOfType.length === 0) {
            return null;
        } else {
            return <SearchResultTable search={search} resultType={resultType} resultsOfType={resultsOfType} resultsPerPage={resultsPerPage} totalResults={noResultsOfType} />
        }
    });
}


export default SearchResults;