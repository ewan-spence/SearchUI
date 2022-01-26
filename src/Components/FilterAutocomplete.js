import { useEffect, useState } from "react";

function FilterAutocomplete({ searchInput, filters }) {
    const [active, setActive] = useState(0);
    const [validFilters, setValidFilters] = useState(filters);

    const [filterInput, setFilterInput] = useState("");

    const minIndex = (str, char1, char2) => {
        var char1Index = str.indexOf(char1);
        var char2Index = str.indexOf(char2);

        if (char1Index === -1 ^ char2Index === -1) {
            return Math.max(char1Index, char2Index);
        }
        return Math.min(char1Index, char2Index);
    }

    useEffect(() => {
        var filterSubstring = searchInput.substring(searchInput.indexOf('@') + 1)

        var separatorIndex = minIndex(filterSubstring, ' ', ';');

        if (separatorIndex !== -1) {
            filterSubstring = filterSubstring.substring(0, separatorIndex);
        }

        setFilterInput(filterSubstring);
    }, [setFilterInput, searchInput])

    useEffect(() => {
        var temp = filters.filter(filter => filter.toLowerCase().startsWith(filterInput.toLowerCase()))
        console.log(temp)

        setValidFilters(temp)
    }, [filters, filterInput])

    if (!searchInput.includes("@")) {
        return <></>
    }

    const clickHandler = () => {

    }

    return <div className="autocomplete-items">
        {validFilters.map((filter, index) => {
            var style = { border: "5px" };

            if (index === validFilters.length) {
                style.borderBottomRadius = "15px"
            }

            if (active === index) {
                style.backgroundColor = "black"
                style.color = "white"
            } else {
                style.backgroundColor = "white"
                style.color = "black"
            }

            return <div key={index} onClick={clickHandler} >
                <strong>{filter.substring(0, filterInput.length)}</strong>{filter.substring(filterInput.length)}
            </div>
        })}
    </div>

}

export default FilterAutocomplete;