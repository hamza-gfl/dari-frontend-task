import React, { FC, useEffect, useState } from 'react'
import BsPagination from 'react-bootstrap/Pagination'

interface iPaginationProps {
    pageList: number[]
    activePage: number
    changeActivePage: (page: number) => void
}

export const Pagination: FC<iPaginationProps> = ({
    pageList,
    activePage,
    changeActivePage,
}) => {
    const [visiblePages, setVisiblePages] = useState([1])
    const half = 4
    useEffect(() => {
        if (pageList.length > 0) {
            if (activePage > half + 1) {
                let result = [
                    pageList[0],
                    0,
                    ...pageList.slice(activePage - half, activePage),
                    ...pageList.slice(activePage, activePage + half - 2),
                ]
                if (activePage + half - 2 < pageList.length) {
                    if (activePage + half - 2 !== pageList.length - 1) {
                        result.push(0)
                    }
                    result.push(pageList[pageList.length - 1])
                }
                setVisiblePages(result)
            } else {
                let result = [...pageList.slice(0, half * 2 - 1)]

                if (half * 2 - 1 < pageList.length) {
                    result.push(0)
                    result.push(pageList[pageList.length - 1])
                }
                setVisiblePages(result)
            }
        }
    }, [pageList, activePage])

    return (
        <BsPagination className="justify-content-center">
            {visiblePages.map((page, index) =>
                page === 0 ? (
                    <BsPagination.Ellipsis key={index} />
                ) : (
                    <BsPagination.Item
                        onClick={() => changeActivePage(page)}
                        key={index}
                        active={page === activePage}
                    >
                        {page}
                    </BsPagination.Item>
                )
            )}
        </BsPagination>
    )
}
