import { useRef, useState } from "react";
import { Button, Dropdown, Form, Stack } from "react-bootstrap";

const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() };

    return [htmlElRef, setFocus]
}

function SearchBar(props) {
    const filterOptions = ["Reports", "Clients", "Portfolios"];

    const [searchTerm, setSearchTerm] = useState("");

    const [focusRef, setFocus] = useFocus();

    const onFilterSelect = (event) => {
        if (searchTerm.includes('@')) {
            var searchList = searchTerm.split(';');

            for (var index = 0; index < searchList.length; index++) {
                var term = searchList[index];

                term.trim()

                if (term.startsWith("@")) {
                    searchList.splice(index, 1);

                    setSearchTerm("@" + event.target.id + "; " + searchList.join('; '))
                    break;
                }
            }
        } else {
            setSearchTerm("@" + event.target.id + "; " + searchTerm);
        }

        setFocus();
    }

    return <Stack direction="horizontal" gap={3}>

        <Stack direction="horizontal" gap={0}>
            <Dropdown>
                <Dropdown.Toggle>
                    Filters
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {filterOptions.map((option) => {
                        return <Dropdown.Item id={option} onClick={onFilterSelect}>Search for {option.toLowerCase()}</Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>

            <Form>
                <Form.Group id="search" controlId="searchinput" >
                    <Form.Control ref={focusRef} placeholder="Search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                </Form.Group>
            </Form>
        </Stack>

        <Button>Search</Button>
    </Stack>
}

export default SearchBar;