import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import './table.css'
import { COLUMNS } from '../../constant/logConstants'
import { FilterKeyType, iLog } from '../../interfaces/logInterfaces'
import { TableFilters } from '../table-filters/TableFilters'
import { iFilterValues } from '../../pages/home/Home'
import {
    Grid,
    SelectChangeEvent,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import MuiTable from '@mui/material/Table'
import MuiPagination from '@mui/material/Pagination'

interface iTableProps {
    list: iLog[]
    filterValues: iFilterValues
    changeFilterValue: (
        e:
            | SelectChangeEvent
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: FilterKeyType
    ) => void
    filterList: () => void
}

const Table: FC<iTableProps> = ({
    list,
    filterValues,
    changeFilterValue,
    filterList,
}) => {
    const [activePage, setActivePage] = useState(1)
    const [rowLimit] = useState(10)
    const [filteredList, setFilteredList] = useState<iLog[]>([])
    const [noOfPages, setNoOfPages] = useState<number>(1)

    useEffect(() => {
        setNoOfPages(list.length > 0 ? Math.ceil(list.length / rowLimit) : 1)
    }, [list.length, setNoOfPages, rowLimit])

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

    const changeActivePage = useCallback(
        (_: unknown, page: number) => setActivePage(page),
        [setActivePage]
    )

    return (
        <Grid container sx={{ padding: '0 40px' }}>
            <Grid item xs={12} sx={{ display: 'flex', margin: '20px 0' }}>
                <TableFilters
                    changeFilterValue={changeFilterValue}
                    filterValues={filterValues}
                    filterList={filterList}
                />
            </Grid>
            <Grid item xs={12} className="table-container">
                <TableContainer component={Paper}>
                    <MuiTable sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                {COLUMNS.map(({ label }) => (
                                    <TableCell key={label}>{label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredList.map((log, index) => (
                                <TableRow key={index}>
                                    {COLUMNS.map((column, index) => (
                                        <TableCell key={index}>
                                            {log[column.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </MuiTable>
                </TableContainer>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    padding: '20px 0',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <MuiPagination
                    onChange={changeActivePage}
                    variant="outlined"
                    count={noOfPages}
                    color="primary"
                    shape="rounded"
                    page={activePage}
                />
            </Grid>
        </Grid>
    )
}

export default Table
