import React, { useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import { getLogListService } from '../../services/logServices'
import { iLog } from '../../interfaces/logInterfaces'

function Home() {
    const [logList, setLogList] = useState<iLog[]>([])

    useEffect(() => {
        getLogList()
    }, [])

    const getLogList = async () => {
        const logs = await getLogListService()
        setLogList(logs)
    }
    return (
        <div>
            <Table list={logList}></Table>
        </div>
    )
}

export default Home
