import React, { FC } from 'react'
import './table.css'
import { COLUMNS, FILTERS, keyType } from '../../constant/constants'
import { Button, Col, Container, Row } from 'react-bootstrap'
import BsTable from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { iLog } from '../../interfaces/logInterfaces'

interface iTable {
    list: iLog[]
}

const Table: FC<iTable> = ({ list }) => {
    return (
        <Container fluid>
            <Row className="m-4">
                {FILTERS.map(({ label, type, inputType, options }, index) => (
                    <Col
                        key={index}
                        className="col align-items-start justify-content-between d-flex flex-col"
                    >
                        <label> {label} </label>
                        {type === 'input' ? (
                            <input type={inputType} className="filter-input" />
                        ) : (
                            <Form.Select className="filter-input width-100">
                                {options.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                        )}
                    </Col>
                ))}
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
                        {list.map((log, index) => (
                            <tr key={index}>
                                {COLUMNS.map((column, index) => (
                                    <td key={index}>
                                        {log[column.key as keyType]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </BsTable>
            </Row>
        </Container>
    )
}

export default Table
