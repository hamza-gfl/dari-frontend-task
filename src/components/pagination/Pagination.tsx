import React, { FC, useEffect, useMemo, useState } from 'react'
import { getEllipsePagination } from '../../utils/logUtils'
import { Grid } from '@mui/material'

interface iPaginationProps {
    noOfPages: number
    activePage: number
    changeActivePage: (page: number) => void
}

export const Pagination: FC<iPaginationProps> = ({
    noOfPages,
    activePage,
    changeActivePage,
}) => {
    const [pageList, setPageList] = useState([1])
    const visiblePageBtns = 7

    useEffect(() => {
        noOfPages > 1 &&
            setPageList(Array.from({ length: noOfPages }, (_, i) => i + 1))
        noOfPages < activePage && changeActivePage(noOfPages)
    }, [noOfPages, activePage, changeActivePage])

    const visiblePages = useMemo(
        () => getEllipsePagination(pageList, activePage, visiblePageBtns),
        [pageList, activePage]
    )

    return (
        <Grid className="justify-content-center ">
            {visiblePages.map((page, index) =>
                page === 0 ? (
                    <button key={`${page}-${index}`}>...</button>
                ) : (
                    <button
                        onClick={() => changeActivePage(page)}
                        key={`${page}-${index}`}
                        className={`${activePage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                )
            )}
        </Grid>
    )
}
