import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { range } from "../helpers";

function FullPagination({ totalPages }) {

    const [active, setActive] = useState(1);

    const createPaginationItem = pageNo => <Pagination.Item active={pageNo === active} onClick={() => setActive(pageNo)}>{pageNo}</Pagination.Item>

    var beginning;
    var middle;
    var end

    if (active > 5) {
        beginning = <>
            <Pagination.First onClick={() => setActive(1)} />
            <Pagination.Prev onClick={() => setActive(active - 1)} />
            <Pagination.Ellipsis disabled />
        </>

        if (active < totalPages - 5) {
            middle = range(active - 4, active + 4, 1).map(createPaginationItem)
            end = <>
                <Pagination.Ellipsis disabled />
                <Pagination.Next onClick={() => setActive(active + 1)} />
                <Pagination.Last onClick={() => setActive(totalPages)} />
            </>
        } else {
            middle = <></>
            end = range(active - 4, totalPages, 1).map(createPaginationItem)
        }
    } else {
        if (active !== 1) {
            beginning = <>
                <Pagination.Prev onClick={() => setActive(active - 1)} />
                {range(1, active + 4, 1).map(createPaginationItem)}
            </>
        } else {
            beginning = <>
                {range(1, active + 4, 1).map(createPaginationItem)}
            </>
        }

        middle = <></>

        end = <>
            <Pagination.Ellipsis disabled />
            <Pagination.Next onClick={() => setActive(active + 1)} />
            <Pagination.Last onClick={() => setActive(totalPages)} />
        </>
    }

    return <Pagination>
        {beginning}
        {middle}
        {end}
    </Pagination>

    // if (active > 5) {

    //     if (active < totalPages - 5) {
    //         return <Pagination>
    //             <Pagination.First onClick={() => setActive(1)} />
    //             <Pagination.Prev onClick={() => setActive(active - 1)} />
    //             <Pagination.Ellipsis disabled />
    //             {range(active - 4, active + 4, 1).map(createPaginationItem)}
    //             <Pagination.Ellipsis disabled />
    //             <Pagination.Next onClick={() => setActive(active + 1)} />
    //             <Pagination.Last onClick={() => setActive(totalPages)} />
    //         </Pagination>

    //     } else {
    //         return <Pagination>
    //             <Pagination.First onClick={() => setActive(1)} />
    //             <Pagination.Prev onClick={() => setActive(active - 1)} />
    //             <Pagination.Ellipsis disabled />
    //             {range(active - 4, totalPages, 1).map(createPaginationItem)}
    //         </Pagination>
    //     }

    // } else {
    //     return <Pagination>
    //         {range(1, active + 4, 1).map(createPaginationItem)}
    //         <Pagination.Ellipsis disabled />
    //         <Pagination.Next onClick={() => setActive(active + 1)} />
    //         <Pagination.Last onClick={() => setActive(totalPages)} />
    //     </Pagination>
    // }

}

export default FullPagination