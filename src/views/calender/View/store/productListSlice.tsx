import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiCreateEvent,
    apiDeleteSalesProducts, apiGetEvents,
} from '@/services/CalenderService'
import type { TableQueries } from '@/@types/common'
import {apiPutGallery} from "@/services/MediaService";

type Product = {
    id: string
    name: string
    productCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
}

type Event = {
    id: string
    name: string
    description: string;
    createdAt: string
    updatedAt: string
}


type Products = Product[]

type GetSalesProductsResponse = {
    data:  Event[]
    total: number
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type EventState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    eventList: Event[]
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'events'

export const createEvent = async <T, U extends Record<string, unknown>>(
    data: U
) => {

    const response = await apiCreateEvent<T, U>(data)
    return response.data
}


export const createEvent2222 = createAsyncThunk(
    `${SLICE_NAME}/event`,
    async (data: GetSalesProductsRequest) => {

        console.log('at create event')
        console.log(data);
        const response = await apiCreateEvent<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

        return response.data
    }
)
export const createEvent2 = createAsyncThunk(
    `${SLICE_NAME}/event2`,
    async () => {

        console.log('at create event2')
    }
)


export const getEvents = createAsyncThunk(
    `${SLICE_NAME}/calendar/event/create`,
    async (data: GetSalesProductsRequest) => {

        console.log('at create event')
        console.log(data);
        const response = await apiGetEvents<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

        return response.data
    }
)



export const deleteProduct = async (data: { id: string | string[] }) => {
    const response = await apiDeleteSalesProducts<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
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

const initialState: EventState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    eventList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const productListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.eventList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.fulfilled, (state, action) => {
                state.eventList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getEvents.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,
} = productListSlice.actions

export default productListSlice.reducer
