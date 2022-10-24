import { iColumn, iFilter } from '../interfaces/logInterfaces'

export const TABLE_FILTER_KEYS = {
    actionType: 'actionType',
    applicationType: 'applicationType',
    applicationId: 'applicationId',
    fromDate: 'fromDate',
    toDate: 'toDate',
} as const

export const TABLE_FILTERS: iFilter[] = [
    {
        label: 'Action Type',
        type: 'select',
        options: [
            {
                label: 'DARI Refresh Token',
                value: 'DARI_REFRESH_TOKEN',
            },
            {
                label: 'DARI App Login',
                value: 'DARI_APP_LOGIN',
            },
            {
                label: 'Initiate  Application',
                value: 'INITIATE_APPLICATION',
            },
        ],
        inputType: '',
        key: TABLE_FILTER_KEYS.actionType,
    },
    {
        label: 'Application Type',
        type: 'select',
        options: [
            {
                label: 'Cert Title Deed Plot',
                value: 'CERT_TITLE_DEED_PLOT',
            },
            {
                label: 'Lease Registration',
                value: 'LEASE_REGISTRATION',
            },
            {
                label: 'Add POA',
                value: 'ADD_POA',
            },
        ],
        inputType: '',
        key: TABLE_FILTER_KEYS.applicationType,
    },
    {
        label: 'From Date',
        type: 'input',
        inputType: 'date',
        options: [],
        key: TABLE_FILTER_KEYS.fromDate,
    },
    {
        label: 'to Date',
        type: 'input',
        inputType: 'date',
        options: [],
        key: TABLE_FILTER_KEYS.toDate,
    },
    {
        label: 'Application ID',
        type: 'input',
        inputType: 'text',
        options: [],
        key: TABLE_FILTER_KEYS.applicationId,
    },
]

export const COLUMNS: iColumn[] = [
    {
        label: 'Log ID',
        key: 'logId',
    },
    {
        label: 'Application Type',
        key: 'applicationType',
    },
    {
        label: 'Application ID',
        key: 'applicationId',
    },
    {
        label: 'Action',
        key: 'actionType',
    },
    {
        label: 'Action Details',
        key: 'logInfo',
    },
    {
        label: 'Date:Time',
        key: 'creationTimestamp',
    },
]
