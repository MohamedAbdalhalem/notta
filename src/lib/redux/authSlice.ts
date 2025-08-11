import myCookies from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit'
 interface authState {
  Token: undefined | string
}
const initialState: authState = {
    Token:  myCookies.get('tkn')
}
export const  authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.Token = action.payload
        },
        deleteToken: (state) => {
            state.Token = undefined
        }
    }
})
export const { setToken, deleteToken } = authSlice.actions
export default authSlice.reducer