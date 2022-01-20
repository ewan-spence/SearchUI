import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import SearchBar from './Components/SearchBar';
import SearchResultTable from './Components/SearchResultTable';

import { useState } from 'react';
import SavedSearch from './Components/SavedSearch';

function App() {
  var sections = ["Reports", "Clients", "Portfolios"];
  var sorts = [{ displayName: "name", keyword: "Name" },
  { displayName: "joined date", keyword: "Joined" },
  { displayName: "portfolio value", keyword: "Value" }]

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({});

  const [savedSearches, setSavedSearches] = useState(["@Clients; ross; /Name"]);

  const mainComponent = () => {

    if (Object.keys(results).length === 0) {
      return <div>
        <h3 className="pb-3">Saved Searches</h3>

        {savedSearches.map(search => <SavedSearch search={search} setSearchTerm={setSearchTerm} onClick={() => null} setResults={setResults} />)}

      </div>
    } else {
      return <SearchResultTable sections={sections} results={results} />
    }
  }

  return (
    <div className="App">
      <Navbar bg="dark">
        <Container>
          <Col style={{ alignItems: "center" }}>
            <SearchBar filterOptions={sections} sortOptions={sorts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setResults={setResults} />
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
