import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import api from '../api'

export const useApi = () => {
    const { Token } = useSelector((state: RootState) => state.authSlice)

    const isAuthenticated = !!Token

    const get = useCallback(async (url: string, config = {}) => {
        if (!isAuthenticated) {
            throw new Error('User not authenticated')
        }
        return api.get(url, config)
    }, [isAuthenticated])

    const post = useCallback(async (url: string, data = {}, config = {}) => {
        if (!isAuthenticated) {
            throw new Error('User not authenticated')
        }
        return api.post(url, data, config)
    }, [isAuthenticated])

    const put = useCallback(async (url: string, data = {}, config = {}) => {
        if (!isAuthenticated) {
            throw new Error('User not authenticated')
        }
        return api.put(url, data, config)
    }, [isAuthenticated])

    const del = useCallback(async (url: string, config = {}) => {
        if (!isAuthenticated) {
            throw new Error('User not authenticated')
        }
        return api.delete(url, config)
    }, [isAuthenticated])

    return {
        api,
        isAuthenticated,
        get,
        post,
        put,
        delete: del
    }
}
