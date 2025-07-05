import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetTeams,
    apiDeleteSalesProducts,
    apiPublishGallery,
    teamsMissingPlayers
} from '@/services/GolfService'
import type { TableQueries } from '@/@types/common'
import {apiPublishEvents} from "@/services/CalenderService";

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

export type Team = {
    id: string
    name: string
    description: string;
    createdAt: string
    updatedAt: string
    label?:string
    value?:string
}


type Products = Product[]

type GetSalesProductsResponse = {
    data:  Gallery[]
    total: number
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
    teamView: number
}

export type TeamListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    tableData: TableQueries
    filterData: FilterQueries
    galleryList: Gallery[]
    teamList: Team[]
    teamListMissingPlayers: Team[]
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'teamList'


export const getTeamsMissingPlayers = createAsyncThunk(
    `${SLICE_NAME}/golf/teamsMissingPlayers`,
    async (data: GetSalesProductsRequest) => {
        console.log("missing players")

        const response = await teamsMissingPlayers<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)
        console.log("arrived here")
        console.log(response.data);
        return response.data
    }
)


export const getTeams = createAsyncThunk(
    `${SLICE_NAME}/golf/teams`,
    async (data: GetSalesProductsRequest) => {
        console.log("whole teams")
        const response = await apiGetTeams<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)
        console.log("aadasda")
        console.log(response.data);
        return response.data
    }
)

export const publishGallery = async <T, U extends Record<string, unknown>>(
) => {

    const response = await apiPublishGallery<T, U>()

    return response.data
}


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

const initialState: TeamListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    galleryList: [],
    tableData: initialTableData,
    teamList: [],
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
            state.teamList = action.payload
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
            .addCase(getTeams.fulfilled, (state, action) => {
                state.teamList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getTeams.pending, (state) => {
                state.loading = true
            })
            .addCase(getTeamsMissingPlayers.fulfilled, (state, action) => {
                state.teamList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getTeamsMissingPlayers.pending, (state) => {
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
