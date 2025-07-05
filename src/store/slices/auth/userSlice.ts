import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    avatar?: string
    name?: string
    userName?: string
    firstName?:string
    lastName?:string
    email?: string
    authority?: string[]
    access?: AccessState[]
    id: string
}

export type AccessState = {
    id: string
    name: string
}

const initialState: UserState = {
    avatar: '',
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    authority: [],
    access: [],
    id: ''
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.avatar = action.payload?.avatar
            state.email = action.payload?.email
            state.userName = action.payload?.userName
            state.firstName = action.payload?.firstName
            state.lastName = action.payload?.lastName
            state.authority = action.payload?.authority
            state.access = action.payload?.access
            state.id = action.payload?.id
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
