import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import SearchBar from './Components/SearchBar';
import SearchResultTable from './Components/SearchResultTable';

import { useGetFiltersQuery } from './App/searchApi';
import { capitalize } from './helpers';

function App() {

  const { data, error, isLoading } = useGetFiltersQuery();

  var sections = [];
  var sorts = {};

  if (!isLoading && !error) {
    sections = data.map(section => capitalize(section.filter));
    sorts = {};

    data.forEach(section => {
      sorts[section.filter] = section.sorts;
    });
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
