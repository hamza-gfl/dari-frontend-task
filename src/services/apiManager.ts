import axios, { AxiosInstance } from 'axios'
import { AxiosResponse } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
    responseType: 'json',
    headers: {
        'Content-type': 'application/json',
        locale: 'en',
    },
})

type axiosMethodTypes = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export const apiManager = {
    request: async (
        url: string,
        body: unknown,
        method: axiosMethodTypes,
        baseURL = process.env.BASE_URL
    ): Promise<AxiosResponse> => {
        try {
            return axiosInstance({
                method: method,
                url: url,
                data: body,
                baseURL: baseURL,
            })
        } catch (e) {
            throw new Error(e as string)
        }
    },
}
