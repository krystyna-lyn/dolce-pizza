import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

const Pagination = ({ onChangePage, pageCount }) => {
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