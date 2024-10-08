import { TableQueries } from '@/@types/common'
import ApiService from './ApiService'
import appConfig from "@/configs/app.config";

export async function apiGetSalesDashboardData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/sales/dashboard',
        method: 'post',
    })
}

/**
 * Formating the params
 * @param data
 */
async function formatParams(data:TableQueries) {

    return [data.pageSize ?? 10, (data.sort?.key ? data.sort?.key : 'name'), (data.sort?.order ? data.sort?.order :'asc'), data.query].filter((param) => {
        console.log('the param');
        console.log(param);
        if (param) {
            return param;
        }
    });
}
export const URL = `${appConfig.apiPrefix}/event`
//export const URL = 'http://172.17.9.165:8000/media'
//export const URL = 'https://d10fm4zdopeh6z.cloudfront.net/api/v1/media'
//export const URL = 'https://api-stage.tomvisions.com/api/v1/media'
export async function apiGetGalleries<T, U extends Record<string, unknown>>(
    data: TableQueries
) {
    const params = await formatParams(data);

    console.log(`${URL}/page-index/${data['pageIndex']}/page-size/${params.join('/')}`)
    return ApiService.fetchData<T>({
        url: `${URL}/page-index/${data['pageIndex']}/page-size/${params.join('/')}`,
        method: 'post',
        data,
    })
}

export async function apiCreateEvent<T, U extends Record<string, unknown>>(
    data: U
) {
    console.log("coming out")
    console.log(`${URL}/`);
    console.log(data);
    return ApiService.fetchData<T>({
        url: `${URL}/`,
        method: 'post',
        data,
    })
}

export async function  apiGetEvents<T, U extends Record<string, unknown>>(
    data: U
) {
    console.log(`${URL}/month`);
    console.log(data);

    return ApiService.fetchData<T>({
        url: `${URL}/event/month`,
        method: 'post',
        data,
    })
}

export async function  apiGetEventMonthByDay<T, U extends Record<string, unknown>>(
    data: U
) {

    const retval =  ApiService.fetchData<T>({
        url: `${URL}/month`,
        method: 'post',
        data,
    })

    return retval
}