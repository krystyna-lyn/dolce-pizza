import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'
import React from 'react';

type PaginationProps = {
    pageCount: number,
    onChangePage: any
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage, pageCount }) => {
    return (
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => onChangePage(e.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Pagination