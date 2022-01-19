import { useRef, useState } from "react";
import { Button, Container, Dropdown, Form, Row, Stack } from "react-bootstrap";

const axios = require('axios');

const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() };

    return [htmlElRef, setFocus]
}

function SearchBar({ filterOptions, setResults, ...rest }) {
    const [searchTerm, setSearchTerm] = useState("");

    const [focusRef, setFocus] = useFocus();

    const onSubmit = (event) => {
        event.preventDefault();

        var url = "https://localhost:44306/api/Search?search=" + searchTerm;

        axios.get(url)
            .then(res => {
                setResults(res.data);
            })
            .catch(_ => {
                setResults({});
            })
    }

    const removeFilter = (event) => {
        // Split the current input on ; and trim whitespace
        var searchList = searchTerm.split(';').map(term => term.trim());

        for (var index = 0; index < searchList.length; index++) {
            var term = searchList[index];

            // Remove filters from the list and decrement the index
            if (term.startsWith("@")) {
                searchList.splice(index, 1);
                index--;
            }
        }

        if (event.target.id === "") {
            setSearchTerm(searchList.join('; '));
        } else {
            // Join the list of terms together
            setSearchTerm("@" + event.target.id + "; " + searchList.join('; '))
        }
    }

    // Add the selected filter to the search text
    const onFilterSelect = (event) => {

        // Handle removing previous filters
        if (searchTerm.includes('@')) {
            removeFilter(event);
        } else {
            setSearchTerm("@" + event.target.id + "; " + searchTerm);
        }

        setFocus();
    }

    return <Container>
        <Row>
            <Stack direction="horizontal" gap={3} style={{ justifyContent: "center" }}>
                <Stack direction="horizontal" gap={0}>
                    <Dropdown>
                        <Dropdown.Toggle style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                            Filters
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item id="" onClick={removeFilter}>
                                Search for everything
                            </Dropdown.Item>
                            {filterOptions.map((option) => {
                                return <Dropdown.Item id={option} onClick={onFilterSelect}>Search for {option.toLowerCase()}</Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form>
                        <Form.Group id="search" controlId="searchinput" >
                            <Form.Control style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} ref={focusRef} placeholder="Search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                        </Form.Group>
                    </Form>
                </Stack>

                <Button onClick={onSubmit}>Search</Button>
            </Stack>
        </Row>
        <Row>

        </Row>
    </Container>

}

export default SearchBar;