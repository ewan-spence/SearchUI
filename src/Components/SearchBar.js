import { useEffect, useRef, useState } from "react";
import { Button, Container, Dropdown, Form, Row, Stack } from "react-bootstrap";

import { add, set } from '../App/resultsSlice';
import { useDispatch } from "react-redux";
import { useSearchMutation } from "../App/searchApi";
import { addSearchTerm } from "../App/searchSlice";

const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() };

    return [htmlElRef, setFocus]
}

function SearchBar({ filterOptions, sortOptions, ...rest }) {
    var itemsPerPage = 15;

    sortOptions[""] = [];

    const [searchTerm, setSearchTerm] = useState("");

    const [focusRef, setFocus] = useFocus();

    const [filter, setFilter] = useState("");
    const [canSort, setCanSort] = useState(false);

    const [trigger] = useSearchMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        var searchList = searchTerm.split(";").map(term => term.trim());
        var checked = false;

        searchList.forEach(term => {
            if (term.startsWith('@')) {
                checked = true;
                var check = term.substring(1).toLowerCase()

                if (Object.keys(sortOptions).includes(check)) {
                    setFilter(check);
                    setCanSort(true);
                    return;
                }
                else setCanSort(false);
                return;
            };
        });

        if (!checked) {
            setCanSort(false);
        }
    }, [searchTerm, sortOptions])

    const onSubmit = (event) => {
        event.preventDefault();

        if (searchTerm.includes("@")) {
            searchWithFilter(searchTerm, filter.toLowerCase(), set);
        } else {
            filterOptions.forEach((option) => {
                var filteredSearchTerm = `@${option}; ` + searchTerm;

                searchWithFilter(filteredSearchTerm, option.toLowerCase(), add);
            })
        }
    }

    const searchWithFilter = (requestString, resultType, resultsAction) => {
        var body = {
            search: requestString,
            page: 1,
            itemsPerPage
        }

        trigger(body)
            .unwrap()
            .then(response => {
                var payload = {
                    resultType,
                    data: {
                        documents: response[resultType],
                        noDocuments: response.totalResults
                    }
                };
                dispatch(resultsAction(payload));
                dispatch(addSearchTerm({ resultType, data: requestString }));
            });
    }


    const removeFilter = (newTerm) => {
        // Split the current input on ; and trim whitespace
        var searchList = newTerm.split(';').map(term => term.trim());

        for (var index = 0; index < searchList.length; index++) {
            var term = searchList[index];

            // Remove filters from the list and decrement the index
            if (term.startsWith("@")) {
                searchList.splice(index, 1);
                index--;
            }
        }


        return searchList.join('; ');
    }

    // Add the selected filter to the search text
    const onFilterSelect = (event) => {
        var newTerm = searchTerm;

        // Handle removing previous filters
        if (searchTerm.includes('@')) {
            newTerm = event.target.id + removeFilter(newTerm);
        } else {
            newTerm = event.target.id + searchTerm;
        }

        newTerm = removeSort(newTerm);
        setSearchTerm(newTerm);

        setFocus();
    }

    const removeSort = (newTerm) => {
        // Split the current input on ; and trim whitespace
        var searchList = newTerm.split(';').map(term => term.trim());

        for (var index = 0; index < searchList.length; index++) {
            var term = searchList[index];

            // Remove filters from the list and decrement the index
            if (term.startsWith("/") || term.startsWith("\\")) {
                searchList.splice(index, 1);
                index--;
            }
        }

        return searchList.join("; ")
    }

    const onSortSelect = (event) => {
        var newTerm = searchTerm;

        if (searchTerm.includes('/') || searchTerm.includes('\\')) {
            newTerm = removeSort(newTerm) + event.target.id;
        } else {
            newTerm = searchTerm + event.target.id;
        }

        setSearchTerm(newTerm);
        setFocus();
    }

    return <Container>
        <Row>
            <Stack direction="horizontal" gap={3} style={{ justifyContent: "center" }}>
                <Stack direction="horizontal" gap={0}>
                    {/* Filters */}
                    <Dropdown>
                        <Dropdown.Toggle style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                            Filters
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item id="" onClick={onFilterSelect}>
                                Search for everything
                            </Dropdown.Item>
                            {filterOptions.map((option) => {
                                return <Dropdown.Item id={"@" + option + "; "} onClick={onFilterSelect}>Search for {option.toLowerCase()}</Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Sorts */}
                    <Dropdown>
                        <Dropdown.Toggle disabled={!canSort} style={{ borderRadius: 0 }}>
                            Sort (Ascending)
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item id="" onClick={onSortSelect}>
                                Default sort
                            </Dropdown.Item>
                            {sortOptions[filter].map((option) => {
                                return <Dropdown.Item id={"; /" + option.keyword} onClick={onSortSelect}>Sort by {option.displayName.toLowerCase()}</Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle disabled={!canSort} style={{ borderRadius: 0 }}>
                            Sort (Descending)
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item id="" onClick={onSortSelect}>
                                Default sort
                            </Dropdown.Item>
                            {sortOptions[filter].map((option) => {
                                return <Dropdown.Item id={"; \\" + option.keyword} onClick={onSortSelect}>Sort by {option.displayName.toLowerCase()}</Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form onSubmit={onSubmit}>
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
    </Container >

}

export default SearchBar;