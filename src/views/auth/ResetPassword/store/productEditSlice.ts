import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetUserById,
    apiUpdateUser
} from '../../../../services/UserService'

import {
    apiGetAccess,
    apiGetAccessList
} from '../../../../services/AccessService'


import type { TableQueries } from '../../../../@types/common'
import {ApiGetAuthentication} from "@/services/AuthService";
import {getAccessList, getUserById, UserEditState} from "@/views/user/Edit/store";


type UserData = {
    id?: string
    name?: string
    firstName?: string
    lastName? :string
    description?: string
    updatedAt?: string
    createdAt?: string
    access?: any
    Accesses?: any;

}

type GetSalesProductResponse = UserData


export const SLICE_NAME = 'GetAuthentication'

export const getAuthentication = createAsyncThunk(
    SLICE_NAME + '/authentication/token',
    async (data: { id: string }) => {
        const response = await ApiGetAuthentication<
            GetSalesProductResponse,
            { id: string }
        >(data)
        //   console.log("users get by id")
        //     console.log(response);

        console.log("the response")
        console.log(response);
        //  console.log(response.data)
        return response.data
    }
)

export type AuthenticationState = {
    loading: boolean
    userData: AuthUserData
}

type AuthUserData = {
    data: UserData
    token: string
}

const initialState: AuthenticationState = {
    loading: true,
    userData: {data: {}, token: ''},
}



const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAuthentication.fulfilled, (state, action) => {
                state.userData = action.payload
                state.loading = false
            })
            .addCase(getAuthentication.pending, (state) => {
                state.loading = true
            })
    },
})

export default productEditSlice.reducer