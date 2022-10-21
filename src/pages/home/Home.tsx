import React, { useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import { getLogListService } from '../../services/logServices'
import { iLog } from '../../interfaces/logInterfaces'
import { TABLE_FILTER_KEYS } from '../../constant/constants'

export interface iFilterValues {
    [TABLE_FILTER_KEYS.actionType]: string
    [TABLE_FILTER_KEYS.applicationType]: string
    [TABLE_FILTER_KEYS.fromDate]: string
    [TABLE_FILTER_KEYS.toDate]: string
    [TABLE_FILTER_KEYS.applicationId]: string
}

function Home() {
    const [logList, setLogList] = useState<iLog[]>([])
    const [filteredList, SetFilteredList] = useState<iLog[]>([])
    const [filterValues, setFilterValues] = useState<iFilterValues>({
        actionType: '',
        applicationType: '',
        fromDate: '',
        toDate: '',
        applicationId: '',
    })

    useEffect(() => {
        filterList()
    }, [logList])

    useEffect(() => {
        getLogList()
    }, [])

    const getLogList = async () => {
        let logs = await getLogListService()
        setLogList(logs)
    }

    const compareWithDate = (log: iLog) => {
        if (
            filterValues[TABLE_FILTER_KEYS.toDate] === '' &&
            filterValues[TABLE_FILTER_KEYS.fromDate] === ''
        ) {
            return true
        }
        let fromDate = filterValues[TABLE_FILTER_KEYS.fromDate]
            ? new Date(filterValues[TABLE_FILTER_KEYS.fromDate]).getTime()
            : 0

        let toDate = filterValues[TABLE_FILTER_KEYS.toDate]
            ? new Date(filterValues[TABLE_FILTER_KEYS.toDate]).getTime()
            : Infinity

        return (
            log.creationDateInMilliSeconds >= fromDate &&
            log.creationDateInMilliSeconds <= toDate
        )
    }

    const filterList = () => {
        SetFilteredList(
            logList.filter((log) =>
                Object.keys(filterValues).every((key) => {
                    if (key === 'applicationType' || key === 'actionType') {
                        return (
                            !filterValues[key] || filterValues[key] === log[key]
                        )
                    }
                    if (key === 'fromDate') {
                        return compareWithDate(log)
                    }
                    if (key === 'applicationId') {
                        return (
                            !filterValues[key] ||
                            String(log[key]).includes(filterValues[key])
                        )
                    }
                    return true
                })
            )
        )
    }

    return (
        <div>
            <Table
                list={filteredList}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                filterList={filterList}
            />
        </div>
    )
}

export default Home
