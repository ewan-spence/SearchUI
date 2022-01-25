import { useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import { range } from "../helpers";

function FullPagination({ totalPages }) {

    const [active, setActive] = useState(1);

    var Beginning = (active) => {
        if (active >= 5) {
            return <span>
                <Pagination.First onClick={() => setActive(1)} />
                <Pagination.Prev onClick={() => setActive(active - 1)} />
            </span>
        } else {
            var pageNumbers = range(1, active, 1);

            return pageNumbers.map(no => <Pagination.Item active={no === active}>{no}</Pagination.Item>);
        }
    }
    var Middle = (active) => {
        return <span></span>
    };
    var End = (active) => {
        return <span></span>
    };

    return <Container fluid ><Pagination>
        <Beginning active={active} />
        <Pagination.Ellipsis disabled />
        <Middle />
        <Pagination.Ellipsis disabled />
        <End />
    </Pagination>
    </Container>
}

export default FullPagination