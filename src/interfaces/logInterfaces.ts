export interface iLog {
    logId: number
    applicationId: number | null
    applicationType: string | null
    companyId: number | null
    creationTimestamp: string
    actionType: string
    logInfo: string | null
}

interface iOptions {
    label: string
    value: string
}

export type FilterKeyType =
    | 'employeeName'
    | 'applicationId'
    | 'applicationType'
    | 'actionType'
    | 'toDate'
    | 'fromDate'

export interface iFilter {
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
