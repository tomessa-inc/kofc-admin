import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetAccessList,
} from '../../../../services/AccessService'

import type { TableQueries } from '../../../../@types/common'

type GalleryFirst = {
    data: GalleryData
}

type GalleryData = {
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
    label: string
    value: string
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


export type UserNewState = {
    loading: boolean
    galleryData: GalleryData
    tableData: TableQueries
    accessList: accessList[]
}

type GetSalesProductResponse = GalleryData
type GetSalesTagResponse = accessList[]

type GetTagsRequest = TableQueries & { filterData?: FilterQueries }

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'UserNew'

export const getGallery = createAsyncThunk(
    SLICE_NAME + '/getGallery',
    async (data: { id: string }) => {
        const response = await apiGetGallleryById<
            GetSalesProductResponse,
            { id: string }
        >(data)

        return response.data
    }
)

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


export const updateProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutSalesProduct<T, U>(data)
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

const initialState: UserNewState = {
    loading: true,
    galleryData: {},
    tagList: [],
    tableData: initialTableData,    
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGallery.fulfilled, (state, action) => {
                state.galleryData = action.payload
                state.loading = false
            })
            .addCase(getGallery.pending, (state) => {
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
