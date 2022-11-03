export interface iLog {
    logId: number
    applicationId: number | null
    applicationType: string | null
    companyId: number | null
    creationTimestamp: string
    actionType: string
    logInfo: string | null
    creationDateInMilliSeconds: number
}

interface iOptions {
    label: string
    value: string
}
// TODO: Try yo use TABLE_FILTER_KEYS to define types.
export type FilterKeyType =
    | 'applicationId'
    | 'applicationType'
    | 'actionType'
    | 'toDate'
    | 'fromDate'

export interface iFilter {
    id: string
    label: string
    type: 'input' | 'select'
    inputType: 'text' | 'date' | ''
    options: iOptions[]
    key: FilterKeyType
}

type TableKeyType =
    | 'logId'
    | 'applicationId'
    | 'applicationType'
    | 'actionType'
    | 'logInfo'
    | 'creationTimestamp'

export interface iColumn {
    label: string
    key: TableKeyType
}
