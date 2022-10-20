import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import './table.css'
import { COLUMNS, FILTERS } from '../../constant/constants'
import { Button, Col, Container, Row } from 'react-bootstrap'
import BsTable from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { FilterKeyType, iLog } from '../../interfaces/logInterfaces'
import { Pagination } from '../pagination/Pagination'

interface iTable {
    list: iLog[]
}

const Table: FC<iTable> = ({ list }) => {
    const [activePage, setActivePage] = useState(1)
    const [rowLimit] = useState(10)
    const [filters, setFilters] = useState({
        employeeName: '',
        actionType: '',
        applicationType: '',
        fromDate: '',
        toDate: '',
        applicationId: '',
    })
    const [filteredList, setFilteredList] = useState<iLog[]>([])
    const [pageList, setPageList] = useState<number[]>([1])

    useEffect(() => {
        list.length > 0 &&
            setPageList(
                Array.from(
                    { length: Math.ceil(list.length / rowLimit) },
                    (_, i) => i + 1
                )
            )
    }, [list.length])

    useEffect(() => {
        list.length &&
            setFilteredList(
                list.slice(
                    (activePage - 1) * rowLimit,
                    (activePage - 1) * rowLimit + rowLimit
                )
            )
    }, [activePage, list])

    const changeActivePage = (page: number) => setActivePage(page)
    const changeFilter = (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        key: FilterKeyType
    ) => setFilters({ ...filters, [key]: e.target.value })
    return (
        <Container fluid>
            <Row className="m-4">
                {FILTERS.map(
                    ({ label, type, inputType, options, key }, index) => (
                        <Col
                            key={index}
                            className="col align-items-start justify-content-between d-flex flex-col"
                        >
                            <label> {label} </label>
                            {type === 'input' ? (
                                <input
                                    value={filters[key]}
                                    type={inputType}
                                    className="filter-input"
                                    onChange={(e) => changeFilter(e, key)}
                                />
                            ) : (
                                <Form.Select
                                    className="filter-input width-100"
                                    value={filters[key]}
                                    onChange={(e) => changeFilter(e, key)}
                                >
                                    <option disabled value="">
                                        Choose a value
                                    </option>
                                    {options.map((option, index) => (
                                        <option
                                            key={index}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                        </Col>
                    )
                )}
                <Col className="d-flex align-items-end justify-content-center">
                    <Button className="btn primary-btn w-100">
                        Search Ledger
                    </Button>
                </Col>
            </Row>
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
