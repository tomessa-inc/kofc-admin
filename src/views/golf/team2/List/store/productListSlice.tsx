import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetTeams,
    apiGetPlayers,
    apiDeleteSalesProducts,
} from '@/services/GolfService'
import type { TableQueries } from '@/@types/common'
import {getTableData} from "@/views/golf/List/store";

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

type Gallery = {
    id: string
    name: string
    description: string;
    createdAt: string
    updatedAt: string
}

type Player = {
    id: string
    name: string
    description: string;
    createdAt: string
    updatedAt: string
}

type Team = {
    id: string
    name: string
    description: string;
    createdAt: string
    updatedAt: string
}

type Products = Product[]

type Galleries = Gallery[]
type GetSalesProductsResponse = {
    data: Galleries
    total: number
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type GolfTeamListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    teamList: Team[]
    filterData: FilterQueries
    golfList: TableQueries
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'golfTeamList'

export const getTeams = createAsyncThunk(
    `${SLICE_NAME}/golf/team`,
    async (data: GetSalesProductsRequest) => {

        const response = await apiGetTeams<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

        return response.data
    }
)

export const getPlayers = createAsyncThunk(
    `${SLICE_NAME}/golf/payer`,
    async (data: GetSalesProductsRequest) => {

        const response = await apiGetPlayers<
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

const initialState: GolfTeamListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    golfList:  initialTableData,
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
            state.tableData = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setPlaterData: (state, action) => {
            state.tableData = action.payload
        },
        setTeamData: (state, action) => {
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
            .addCase(getTableData.fulfilled, (state, action) => {
                state.tableData = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getTableData.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTeamData,
    setPlaterData,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,
} = productListSlice.actions

export default productListSlice.reducer
