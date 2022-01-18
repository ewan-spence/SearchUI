import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import SearchBar from './Components/SearchBar';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" expand="lg">
        <Container>
          <SearchBar />
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
