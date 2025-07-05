import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetTeams,
    apiDeleteSalesProducts,
    apiPublishGallery, apiGetPlayers, apiGetTeamsMissingPlayersLabelValues
} from '@/services/GolfService'
import type { TableQueries } from '@/@types/common'
import {apiPublishEvents} from "@/services/CalenderService";
import {apiGetPlayersByTeamId} from "@/services/GolfService";
import {Team} from "@/views/golf/team/List/store";

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
}

export type PlayerListByTeamIdState = {
    loading: boolean
    addPlayerConfirmation: boolean,
    deleteConfirmation: boolean
    selectedProduct: string
    drawerOpen: boolean
    tableData: TableQueries
    filterData: FilterQueries
    teamList: Team[]
    playerList: Player[]
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'playerByTeamId'

export const getPlayersByTeamId = createAsyncThunk(
    `${SLICE_NAME}/golf/playerByTeamId`,
    async (data: GetSalesProductsRequest) => {
        const response = await apiGetPlayersByTeamId<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)
        console.log('the response');
        console.log(response.data);
        return response.data
    }
)


export const getTeamsMissingPlayersLabelValues = createAsyncThunk(
    `${SLICE_NAME}/golf/team/playersNeeded`,
    async (data: GetSalesProductsRequest) => {
        const response = await apiGetTeamsMissingPlayersLabelValues<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)
        console.log('the response');
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

const initialState: PlayerListByTeamIdState = {
    loading: false,
    deleteConfirmation: false,
    addPlayerConfirmation: false,
    selectedProduct: '',
    teamList: [],
    playerList: [],
    drawerOpen: false,
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
            state.playerList = action.payload
        },
        setPlayerList: (state, action) => {
            state.playerList = action.payload
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
        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },

        setDrawerClose: (state) => {
            state.drawerOpen = false
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(getPlayersByTeamId.fulfilled, (state, action) => {
                state.playerList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getPlayersByTeamId.pending, (state) => {
                state.loading = true
            })

    },
})

export const {
    setPlayerList,
    updateProductList,
    setTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,
    setDrawerOpen,
    setDrawerClose,
} = productListSlice.actions

export default productListSlice.reducer
