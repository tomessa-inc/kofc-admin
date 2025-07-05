import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetTeams,
    teamsMissingPlayers,
    apiDeleteSalesProducts,
    apiPublishGallery, apiGetPlayers,
    apiUpdatePlayer,

} from '@/services/GolfService'
import {Team} from "@/views/golf/team/List/store";
import type { TableQueries } from '@/@types/common'
import {apiPublishEvents} from "@/services/CalenderService";
import {apiUpdateUser} from "@/services/UserService";
import {FormModel} from "@/views/golf/player/Form";

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
export type Player = {
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

export type TeamsMissingPlayersState = {
    loading: boolean
    teamLoading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
    drawerOpen: boolean
    selectedPlayer:  Partial<Player>
    tableData: TableQueries
    teamTableData: TableQueries
    filterData: FilterQueries
    galleryList: Gallery[]
    playerList: Player[]
    teamList: Team[]
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'playerListWithoutTeams'

export const getPlayers = createAsyncThunk(
    `${SLICE_NAME}/players/list`,
    async (data: GetSalesProductsRequest) => {

        const response = await apiGetPlayers<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

        console.log(response.data);
        return response.data
    }
)

export const getTeamsMissingPlayers = createAsyncThunk(
    `${SLICE_NAME}/teams/missing`,
    async (data: GetSalesProductsRequest) => {
        console.log("data teams")
        const response = await teamsMissingPlayers<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

  ///      console.log("right here")
     //   console.log(response.data);
        return response.data
    }
)


export const putPlayer = createAsyncThunk(
    `${SLICE_NAME}/player/update`,
    async (data: FormModel) => {
        const response = await apiUpdatePlayer(data)
        return response.data
    },
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

const initialState: TeamsMissingPlayersState = {
    loading: false,
    teamLoading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    drawerOpen: false,
    galleryList: [],
    playerList: [],
    selectedPlayer: {},
    tableData: initialTableData,
    teamTableData: initialTableData,

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
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setTeamTableData: (state, action) => {
            state.teamTableData = action.payload
        },

        setTeamList: (state, action) => {
            state.teamList = action.payload
        },

        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedPlayer: (state, action) => {
            state.selectedPlayer = action.payload
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
    setTeamList,
    setTableData,
    setTeamTableData,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedPlayer,
    setDrawerOpen,
    setDrawerClose,
} = productListSlice.actions

export default productListSlice.reducer
