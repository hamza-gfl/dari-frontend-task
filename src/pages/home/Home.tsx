import React, { ChangeEvent, useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import { getLogListService } from '../../services/logServices'
import { FilterKeyType, iLog } from '../../interfaces/logInterfaces'
import { TABLE_FILTER_KEYS } from '../../constant/logConstants'
import { compareWithDate } from '../../utils/logUtils'
import { SelectChangeEvent } from '@mui/material'

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

    const filterLogList = () => {
        SetFilteredList(
            logList.filter((log) =>
                Object.keys(filterValues).every((key) => {
                    if (key === 'applicationType' || key === 'actionType') {
                        return (
                            !filterValues[key] || filterValues[key] === log[key]
                        )
                    }
                    if (key === 'fromDate') {
                        return compareWithDate(
                            log,
                            filterValues[TABLE_FILTER_KEYS.fromDate],
                            filterValues[TABLE_FILTER_KEYS.toDate]
                        )
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

    useEffect(() => {
        filterLogList()
    }, [logList]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getLogList()
    }, [])

    const getLogList = async () => {
        let logs = await getLogListService()
        setLogList(logs)
    }

    const changeFilterValue = (
        e:
            | SelectChangeEvent<string>
            | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        key: FilterKeyType
    ) => setFilterValues({ ...filterValues, [key]: e.target.value })

    return (
        <div>
            <Table
                list={filteredList}
                filterValues={filterValues}
                changeFilterValue={changeFilterValue}
                filterList={filterLogList}
            />
        </div>
    )
}

export default Home
