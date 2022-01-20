import axios from "axios";
import { Card } from "react-bootstrap";

function SavedSearch({ search, setSearchTerm, setResults }) {
    const sendSavedSearch = (event) => {
        setSearchTerm(search);
        var url = "https://localhost:44306/api/Search?search=" + search;

        axios.get(url)
            .then(res => {
                setResults(res.data);
            })
            .catch(_ => {
                setResults({});
            })
    }

    const formatSearchDescription = (search) => {
        var description = "";

        var searchList = search.split(";").map(term => term.trim());
        console.log(searchList);

        searchList.forEach(term => {
            console.log(term);
            if (term.startsWith("@") && !description.includes("Search for")) {
                description = "Search for " + term.substring(1).toLowerCase() + ", " + description;
            } else if (term.startsWith("/") && !description.includes("sorting by")) {
                description += " sorting by " + term.substring(1).toLowerCase() + " (ascending)";
            } else if (term.startsWith("\\") && !description.includes("sorting by")) {
                description += " sorting by " + term.substring(1).toLowerCase() + " (descending)";
            } else {
                description += "\"" + term + "\",";
            }
        });

        return description;
    }

    return <Card onClick={sendSavedSearch} style={{ cursor: "pointer" }}>
        <Card.Title>{formatSearchDescription(search)}</Card.Title>
        <Card.Subtitle>{search}</Card.Subtitle>
    </Card>
}

export default SavedSearch;