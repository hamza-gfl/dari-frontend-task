import React, { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react'
import './table.css'
import { COLUMNS } from '../../constant/constants'
import { Container, Row } from 'react-bootstrap'
import BsTable from 'react-bootstrap/Table'
import { FilterKeyType, iLog } from '../../interfaces/logInterfaces'
import { Pagination } from '../pagination/Pagination'
import { TableFilters } from '../table-filters/TableFilters'
import { iFilterValues } from '../../pages/home/Home'

interface iTableProps {
    list: iLog[]
    filterValues: iFilterValues
    setFilterValues: Dispatch<iFilterValues>
    filterList: () => void
}

const Table: FC<iTableProps> = ({
    list,
    filterValues,
    setFilterValues,
    filterList,
}) => {
    const [activePage, setActivePage] = useState(1)
    const [rowLimit] = useState(10)
    const [filteredList, setFilteredList] = useState<iLog[]>([])
    const [pageList, setPageList] = useState<number[]>([1])

    useEffect(() => {
        const noOfPage = list.length > 0 ? Math.ceil(list.length / rowLimit) : 1
        list.length > 0 &&
            setPageList(Array.from({ length: noOfPage }, (_, i) => i + 1))
        noOfPage < activePage && setActivePage(noOfPage)
    }, [list.length, rowLimit, activePage])

    useEffect(() => {
        setFilteredList(
            list.length
                ? list.slice(
                      (activePage - 1) * rowLimit,
                      (activePage - 1) * rowLimit + rowLimit
                  )
                : []
        )
    }, [activePage, list, rowLimit])

    const changeActivePage = (page: number) => setActivePage(page)

    const changeFilterValue = (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        key: FilterKeyType
    ) => setFilterValues({ ...filterValues, [key]: e.target.value })

    return (
        <Container fluid>
            <TableFilters
                changeFilterValue={changeFilterValue}
                filterValues={filterValues}
                filterList={filterList}
            />
            <Row className="m-4 table-container">
                <BsTable responsive>
                    <thead>
                        <tr>
                            {COLUMNS.map(({ label }) => (
                                <th key={label}>{label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.map((log, index) => (
                            <tr key={index}>
                                {COLUMNS.map((column, index) => (
                                    <td key={index}>{log[column.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </BsTable>
            </Row>
            <Row>
                <Pagination
                    changeActivePage={changeActivePage}
                    pageList={pageList}
                    activePage={activePage}
                />
            </Row>
        </Container>
    )
}

export default Table
