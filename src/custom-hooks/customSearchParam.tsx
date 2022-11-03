import { useSearchParams } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

export const useCustomSearchParams = (): [
    { [p: string]: string },
    (key: string, value: string) => void
] => {
    const [search, setQueryParams] = useSearchParams()
    const queryParams = useMemo(
        () => Object.fromEntries(new URLSearchParams(search)),
        [search]
    )
    const setParam = useCallback(
        (key: string, value: string) => {
            setQueryParams({ ...queryParams, [key]: value })
        },
        [queryParams, setQueryParams]
    )
    return [queryParams, setParam]
}
