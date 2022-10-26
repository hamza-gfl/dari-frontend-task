import React, { ChangeEvent, useEffect, useState, Suspense } from 'react'
import { getLogListService } from '../../services/logServices'
import { FilterKeyType, iLog } from '../../interfaces/logInterfaces'
import { TABLE_FILTER_KEYS } from '../../constant/logConstants'
import { compareWithDate } from '../../utils/logUtils'
import { SelectChangeEvent } from '@mui/material'
import { useCustomSearchParams } from '../../custom-hooks/customSearchParam'
const Table = React.lazy(() => import('../../components/table/Table'))

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
    const [queryParams, setQueryParam] = useCustomSearchParams()

    useEffect(() => {
        filterLogList()
    }, [logList]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getLogList()
    }, [])

    useEffect(() => {
        const actionType = queryParams[TABLE_FILTER_KEYS.actionType]
        const applicationType = queryParams[TABLE_FILTER_KEYS.applicationType]
        const fromDate = queryParams[TABLE_FILTER_KEYS.fromDate]
        const toDate = queryParams[TABLE_FILTER_KEYS.toDate]
        const applicationId = queryParams[TABLE_FILTER_KEYS.applicationId]
        setFilterValues({
            [TABLE_FILTER_KEYS.actionType]: actionType ? actionType : '',
            [TABLE_FILTER_KEYS.applicationType]: applicationType
                ? applicationType
                : '',
            [TABLE_FILTER_KEYS.fromDate]: fromDate ? fromDate : '',
            [TABLE_FILTER_KEYS.toDate]: toDate ? toDate : '',
            [TABLE_FILTER_KEYS.applicationId]: applicationId
                ? applicationId
                : '',
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

    const changeFilterValue = (
        e:
            | SelectChangeEvent<string>
            | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        key: FilterKeyType
    ) => {
        setFilterValues({
            ...filterValues,
            [key]: e.target.value,
        })
        setQueryParam(key, e.target.value)
    }

    const getLogList = async () => {
        let logs = await getLogListService()
        setLogList(logs)
    }

    return (
        <div>
            <Suspense fallback={<div> Loading... </div>}>
                <Table
                    list={filteredList}
                    filterValues={filterValues}
                    changeFilterValue={changeFilterValue}
                    filterList={filterLogList}
                />
            </Suspense>
        </div>
    )
}

export default Home
