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
