import { apiManager } from './apiManager'
import { iLog } from '../interfaces/logInterfaces'

export const getLogListService = async (): Promise<iLog[]> => {
    const url = 'https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f'
    const resp = await apiManager.request(url, {}, 'GET')
    return resp.data.result.auditLog.map((log: iLog) => {
        log.creationDateInMilliSeconds = new Date(
            log.creationTimestamp.split(' ')[0]
        ).getTime()
        return log
    })
}
