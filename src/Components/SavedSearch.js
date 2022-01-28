import axios from "axios";
import { useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useGetSavedSearchesQuery } from '../App/searchApi';
import { selectSavedSearches, addSavedSearches } from '../App/searchSlice';

function SavedSearch({ searchTerm, setSearchTerm, submit }) {

    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetSavedSearchesQuery(0);


    const setSavedSearch = (search) => {
        setSearchTerm(() => search);
    };

    const formatSearchDescription = (search) => {
        var description = "";

        var searchList = search.split(";").map(term => term.trim());

        searchList.forEach(term => {
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
    };

    const renderSavedSearches = () => {

        const savedSearches = data.map((savedSearch, index) => (
            <Card key={index} onClick={() => setSavedSearch(savedSearch.search)} style={{ cursor: "pointer", padding: 8, backgroundColor: "whitesmoke" }}>
                <Card.Subtitle>{savedSearch.search}</Card.Subtitle>
                <Card.Text>({formatSearchDescription(savedSearch.search)})</Card.Text>
            </Card>
        ));

        return (
            <div style={{ position: "fixed", marginTop: 4 }}>
                <Card style={{ padding: 8, backgroundColor: "whitesmoke" }}>
                    <Card.Title>Saved Searches</Card.Title>
                </Card>
                {savedSearches}
            </div>
        )
    };

    const renderLoadingError = () => {
        return (
            <div style={{ position: "fixed", marginTop: 4, width: 400 }}>
                <Card style={{ padding: 8, backgroundColor: "whitesmoke" }}>
                    <Card.Subtitle>Could not load saved searches</Card.Subtitle>
                </Card>
            </div>
        )
    }

    const renderComponent = () => {
        if (data) {
            return renderSavedSearches();
        }
        else if (error) {
            return renderLoadingError();
        }
        else {
            return null;
        }
    };

    return renderComponent();

}

export default SavedSearch;