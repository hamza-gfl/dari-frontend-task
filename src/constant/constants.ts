export const FILTERS = [
    {
        label: 'Employee Name',
        type: 'input',
        inputType: 'text',
        options: [],
    },
    {
        label: 'Action Type',
        type: 'select',
        options: [
            {
                label: 'Submit application',
                value: 'Submit application',
            },
        ],
        inputType: '',
    },
    {
        label: 'Application Type',
        type: 'select',
        options: [
            {
                label: 'Lease renewal',
                value: 'Lease renewal',
            },
        ],
        input: '',
    },
    {
        label: 'From Date',
        type: 'input',
        inputType: 'date',
        options: [],
    },
    {
        label: 'to Date',
        type: 'input',
        inputType: 'date',
        options: [],
    },
    {
        label: 'Application ID',
        type: 'input',
        inputType: 'text',
        options: [],
    },
]

export const COLUMNS = [
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

const tableKeys = COLUMNS.map((c) => c.key)
console.log(typeof tableKeys)
export type keyType =
    | 'logId'
    | 'applicationId'
    | 'applicationType'
    | 'actionType'
    | 'logInfo'
    | 'creationTimestamp'
// interface iColumn {
//     label: string
//     key: COLUMNS.map((c) => c.key) as const;
// }
