import { useSearchParams } from 'react-router-dom'

export const useCustomSearchParams = (): [
    { [p: string]: string },
    (key: string, value: string) => void
] => {
    const [search, setQueryParams] = useSearchParams()
    const queryParams = Object.fromEntries(new URLSearchParams(search))
    const setParam = (key: string, value: string) => {
        setQueryParams({ ...queryParams, [key]: value })
    }
    return [queryParams, setParam]
}
