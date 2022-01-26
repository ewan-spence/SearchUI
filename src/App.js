import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import SearchBar from './Components/SearchBar';

import { useState } from 'react';
import SavedSearch from './Components/SavedSearch';
import { useGetFiltersQuery } from './App/searchApi';
import { capitalize } from './helpers';
import SearchResults from './Components/SearchResults';

import { selectResults } from './App/resultsSlice';
import { useSelector } from 'react-redux';

function App() {

  const { data, error, isLoading } = useGetFiltersQuery();

  const results = useSelector(selectResults).documents;

  var sections = [];
  var sorts = {};

  if (!isLoading && !error) {
    sections = data.map(section => capitalize(section.filter));
    sorts = {};

    data.forEach(section => {
      sorts[section.filter] = section.sorts;
    });
  }

  const [savedSearches, setSavedSearches] = useState(["@Clients; ross; /Name"]);

  const mainComponent = () => {

    if (Object.keys(results).length === 0) {
      return <div>
        <h3 className="pb-3">Saved Searches</h3>

        {savedSearches.map(search => <SavedSearch search={search} />)}

      </div>
    } else {
      return <SearchResults sections={sections} />
    }
  }

  return (
    <div className="App">
      <Navbar bg="dark">
        <Container>
          <Col style={{ alignItems: "center" }}>
            <SearchBar filterOptions={sections} sortOptions={sorts} />
          </Col>
        </Container>
      </Navbar>

      <Container className="mt-5">
        {mainComponent()}
      </Container>
    </div>
  );
}

export default App;
