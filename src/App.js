import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import SearchBar from './Components/SearchBar';

import { useGetFiltersQuery } from './App/searchApi';
import { capitalize } from './helpers';
import SearchResults from './Components/SearchResults';

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
        <SearchResults sections={sections} />
      </Container>
    </div>
  );
}

export default App;
