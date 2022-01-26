import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { range } from "../helpers";

function FullPagination({ totalPages, activePage, setActivePage }) {

    const createPaginationItem = pageNo => <Pagination.Item active={pageNo === activePage} onClick={() => setActivePage(pageNo)}>{pageNo}</Pagination.Item>

    var beginning;
    var middle;
    var end

    if (totalPages <= 5) {
        beginning = <></>
        middle = range(1, totalPages, 1).map(createPaginationItem);
        end = <></>
    }

    if (activePage > 5) {
        beginning = <>
            <Pagination.First onClick={() => setActivePage(1)} />
            <Pagination.Prev onClick={() => setActivePage(activePage - 1)} />
            <Pagination.Ellipsis disabled />
        </>

        if (activePage < totalPages - 5) {
            middle = range(activePage - 4, activePage + 4, 1).map(createPaginationItem)
            end = <>
                <Pagination.Ellipsis disabled />
                <Pagination.Next onClick={() => setActivePage(activePage + 1)} />
                <Pagination.Last onClick={() => setActivePage(totalPages)} />
            </>
        } else {
            middle = <></>
            end = range(activePage - 4, totalPages, 1).map(createPaginationItem)
        }
    } else {
        if (activePage !== 1) {
            beginning = <>
                <Pagination.Prev onClick={() => setActivePage(activePage - 1)} />
                {range(1, activePage + 4, 1).map(createPaginationItem)}
            </>
        } else {
            beginning = <>
                {range(1, activePage + 4, 1).map(createPaginationItem)}
            </>
        }

        middle = <></>

        end = <>
            <Pagination.Ellipsis disabled />
            <Pagination.Next onClick={() => setActivePage(activePage + 1)} />
            <Pagination.Last onClick={() => setActivePage(totalPages)} />
        </>
    }

    return <Pagination>
        {beginning}
        {middle}
        {end}
    </Pagination>

}

export default FullPagination