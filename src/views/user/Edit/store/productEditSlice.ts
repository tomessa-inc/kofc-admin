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

type GalleryFirst = {
    data: GalleryData
}

type UserData = {
    id?: string
    name?: string
    description?: string
    updatedAt?: string
    createdAt?: string
}

type ImagesData = {

    id?: string
    key?: string
    gallery?: string
    name?: string
    updatedAt?: string
    createdAt?: string
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

type Tag = {
    id: string
    name: string
    description: string
}

type accessList = {
    id: string
    name: string
}

type GetTagsResponse = {
    data: Tag[]
    total: number
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}


export type UserEditState = {
    loading: boolean
    userData: UserData
    tableData: TableQueries
    accessList: accessList
}

type GetSalesProductResponse = UserData
type GetSalesTagResponse = accessList[]

type GetTagsRequest = TableQueries & { filterData?: FilterQueries }

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'UserEdit'

export const getUserById = createAsyncThunk(
    SLICE_NAME + '/users/edit',
    async (data: { id: string }) => {
        const response = await apiGetUserById<
            GetSalesProductResponse,
            { id: string }
        >(data)
        console.log("users")
        console.log(response.data)
        return response.data
    }
)

//console.log("get users")
//console.log(getUserById)

export const getAccessList = createAsyncThunk(
    `${SLICE_NAME}/access/list`,
    async (data: GetSalesProductsRequest) => {

        const response = await apiGetAccessList<
            GetSalesTagResponse,
            GetSalesProductsRequest
        >(data)
 
        return response.data
    }
)


export const updateUser = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiUpdateUser<T, U>(data)
    return response.data
}

export const updateGallery = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutGallery<T, U>(data)
    return response.data
}


export const deleteProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiDeleteSalesProducts<T, U>(data)
    return response.data
}

const initialState: UserEditState = {
    loading: true,
    userData: {},
    accessList: [],
    tableData: initialTableData,    
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserById.fulfilled, (state, action) => {
                state.userData = action.payload
                state.loading = false
            })
            .addCase(getUserById.pending, (state) => {
                state.loading = true
            })
            .addCase(getAccessList.fulfilled, (state, action) => {
                state.accessList = action.payload
                state.loading = false
            })
            .addCase(getAccessList.pending, (state) => {
                state.loading = true
            })

    },
})

export default productEditSlice.reducer
