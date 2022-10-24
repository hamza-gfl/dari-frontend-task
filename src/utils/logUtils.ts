import { iLog } from '../interfaces/logInterfaces'

export const compareWithDate = (
    log: iLog,
    fromDate: string,
    toDate: string
) => {
    if (toDate === '' && fromDate === '') {
        return true
    }
    let fromDateInMs = fromDate ? new Date(fromDate).getTime() : 0

    let toDateInMs = toDate ? new Date(toDate).getTime() : Infinity

    return (
        log.creationDateInMilliSeconds >= fromDateInMs &&
        log.creationDateInMilliSeconds <= toDateInMs
    )
}

export const getEllipsePagination = (
    pageList: number[],
    activePage: number,
    visiblePageBtns: number
) => {
    const halfVisiblePageBtns = Math.ceil(visiblePageBtns / 2)
    let ellipsePaginationArray: number[] = []

    if (activePage <= halfVisiblePageBtns) {
        ellipsePaginationArray = [
            ...ellipsePaginationArray,
            ...pageList.slice(0, visiblePageBtns - 1),
        ]
    } else if (
        activePage > halfVisiblePageBtns &&
        activePage + halfVisiblePageBtns - 1 <= pageList.length
    ) {
        ellipsePaginationArray = [
            pageList[0],
            0,
            ...pageList.slice(activePage - halfVisiblePageBtns + 1, activePage),
            ...pageList.slice(activePage, activePage + halfVisiblePageBtns - 2),
        ]
    } else {
        ellipsePaginationArray = [
            pageList[0],
            0,
            ...pageList.slice(
                pageList.length - visiblePageBtns + 1,
                pageList.length
            ),
        ]
    }

    if (activePage + halfVisiblePageBtns - 1 <= pageList.length) {
        if (activePage + halfVisiblePageBtns - 1 < pageList.length) {
            ellipsePaginationArray.push(0)
        }
        ellipsePaginationArray.push(pageList[pageList.length - 1])
    }
    return ellipsePaginationArray
}
