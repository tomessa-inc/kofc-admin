import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiCreateEvent,
    apiGetEventMonthByDay, apiGetEvents, apiPublishEvents,
} from '@/services/CalenderService'
import type { TableQueries } from '@/@types/common'
import {apiPutGallery} from "@/services/MediaService";
import {DayPilot} from "@daypilot/daypilot-lite-react";


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

export type Event = {
    id: string
    name: string
    description: string;
    createdAt: string
    updatedAt: string
}


type Products = Product[]

type GetSalesProductsResponse = {
    data:  any
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
 /*   tableData: TableQueries */
   // filterData: FilterQueries
    data: Event[],
    eventList: any

    //eventList: TableQueries
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

export const publishEvents = createAsyncThunk(
    `${SLICE_NAME}/events/publish`,
    async (data: GetSalesProductsRequest) => {

        let response = await apiPublishEvents<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

        return response.data
    }
)


export const getEventMonthByDay = createAsyncThunk(
    `${SLICE_NAME}/events/get`,
    async (data: GetSalesProductsRequest) => {

        let response = await apiGetEventMonthByDay<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)
        let temp: any[] = [];


      //  console.log('here we are with data')
     //   console.log(response)
   //     const jsonArray:any[] = []
     /*   response.data.data =  response.data.data.map((the:any) => {
            const jsonObject = {
                id: the.id,
                text: the.text,
                start: DayPilot.Date.fromYearMonthDay(the.year, the.months, the.day).addHours(the.hourStart),
                end: DayPilot.Date.fromYearMonthDay(the.year, the.months, the.day).addHours(the.hourEnd),
            }

         //   jsonArray.push(jsonObject);
           // console.log(jsonArray);
            /*
            {
                id: 1,
                    text: "Parish Feast Day",
                start: DayPilot.Date.fromYearMonthDay(2024, 9, 15).addHours(19),
                end: DayPilot.Date.fromYearMonthDay(2024, 9, 15).addHours(20),
                description: "Knight of Columbus BBQ",
            },
            return jsonObject;



        });*/
  //      response.data.data = temp;
  //      console.log('reso')
    //    console.log(response.data);
        return response.data
    }
)





export const getEvents = createAsyncThunk(
    `${SLICE_NAME}/events/get`,
    async (data: GetSalesProductsRequest) => {

        const response = await apiGetEvents<
            GetSalesProductsResponse,
            GetSalesProductsRequest
        >(data)

        return response.data
    }
)

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

export const initialEvent: TableQueries = {
    data: [],
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
    data: {},
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    eventList: initialEvent,
 //   tableData: initialTableData,
   /* filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    }, */
}

const productListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateEventCalender: (state, action) => {
            state.data = action.payload
        },
        /*
        setTableData: (state, action) => {
            state.tableData = action.payload
        }, */

    /*    setFilterData: (state, action) => {
            state.filterData = action.payload
        }, */
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEventMonthByDay.fulfilled, (state, action) => {
                state.data = action.payload.data
          //      state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getEventMonthByDay.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateEventCalender,
   // setTableData,
  //  setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,
} = productListSlice.actions

export default productListSlice.reducer
