import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import SearchBar from './Components/SearchBar';
import SearchResultTable from './Components/SearchResultTable';

import { useState } from 'react';

function App() {
  var sections = ["Reports", "Clients", "Portfolios"];
  var sorts = {
    clients: [
      { displayName: "name", keyword: "Name" },
      { displayName: "joined date", keyword: "Joined" },
      { displayName: "portfolio value", keyword: "Value" }
    ],
    portfolios: [
      { displayName: "value", keyword: "Value" },
      { displayName: "client name", keyword: "Client" }],
    reports: [
      { displayName: "updated date", keyword: "Updated" },
      { displayName: "created date", keyword: "Created" },
      { displayName: "report name", keyword: "Name" },
      { displayName: "client name", keyword: "Client" }]
  }

  const [results, setResults] = useState({});

  return (
    <div className="App">
      <Navbar bg="dark">
        <Container>
          <Col style={{ alignItems: "center" }}>
            <SearchBar filterOptions={sections} sortOptions={sorts} setResults={setResults} />
          </Col>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <SearchResultTable sections={sections} results={results} />
      </Container>
    </div>
  );
}

export default App;
