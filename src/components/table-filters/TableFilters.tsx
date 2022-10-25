import { TABLE_FILTERS } from '../../constant/logConstants'
import Button from '@mui/material/Button'
import React, { ChangeEvent, FC } from 'react'
import { FilterKeyType } from '../../interfaces/logInterfaces'
import { iFilterValues } from '../../pages/home/Home'
import {
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material'
import './tableFilters.css'

interface iTableFiltersProps {
    filterValues: iFilterValues
    changeFilterValue: (
        e:
            | SelectChangeEvent
            | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        <>
            {TABLE_FILTERS.map(
                ({ label, type, inputType, options, key }, index) => (
                    <Grid
                        item
                        xs={2}
                        sx={{
                            marginRight: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        }}
                        key={index}
                    >
                        <Typography>{label}</Typography>
                        {type === 'input' ? (
                            <TextField
                                sx={{ marginTop: '5px' }}
                                value={filterValues[key]}
                                type={inputType}
                                className="filter-field text-input"
                                onChange={(e) => changeFilterValue(e, key)}
                            />
                        ) : (
                            <Select
                                className="filter-field"
                                value={filterValues[key]}
                                onChange={(e) => changeFilterValue(e, key)}
                                sx={{ textAlign: 'left', paddingLeft: 0 }}
                            >
                                <MenuItem value="">Choose a value</MenuItem>
                                {options.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    </Grid>
                )
            )}
            <Grid
                item
                xs={2}
                sx={{
                    marginRight: '10px',
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                <Button
                    sx={{ width: '100%', height: '38px' }}
                    variant="contained"
                    onClick={filterList}
                >
                    Search Ledger
                </Button>
            </Grid>
        </>
    )
}
