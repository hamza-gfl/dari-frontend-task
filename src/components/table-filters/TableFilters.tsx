import { TABLE_FILTERS } from '../../constant/logConstants'
import { Button, Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import React, { ChangeEvent, FC } from 'react'
import { FilterKeyType } from '../../interfaces/logInterfaces'
import { iFilterValues } from '../../pages/home/Home'

interface iTableFiltersProps {
    filterValues: iFilterValues
    changeFilterValue: (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        key: FilterKeyType
    ) => void
    filterList: () => void
}

export const TableFilters: FC<iTableFiltersProps> = ({
    filterValues,
    changeFilterValue,
    filterList,
}) => {
    return (
        <Row className="m-4">
            {TABLE_FILTERS.map(
                ({ label, type, inputType, options, key }, index) => (
                    <Col
                        key={index}
                        className="align-items-start justify-content-between d-flex flex-column"
                    >
                        <label> {label} </label>
                        {type === 'input' ? (
                            <input
                                value={filterValues[key]}
                                type={inputType}
                                className="filter-input"
                                onChange={(e) => changeFilterValue(e, key)}
                            />
                        ) : (
                            <Form.Select
                                className="filter-input width-100"
                                value={filterValues[key]}
                                onChange={(e) => changeFilterValue(e, key)}
                            >
                                <option value="">Choose a value</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                        )}
                    </Col>
                )
            )}
            <Col className="d-flex align-items-end justify-content-center">
                <Button className="btn primary-btn w-100" onClick={filterList}>
                    Search Ledger
                </Button>
            </Col>
        </Row>
    )
}
