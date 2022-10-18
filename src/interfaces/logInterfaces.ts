export interface iLog {
    logId: number
    applicationId: number | null
    applicationType: string | null
    companyId: number | null
    creationTimestamp: string
    actionType: string
    logInfo: string | null
}
