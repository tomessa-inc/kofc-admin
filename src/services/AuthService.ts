import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/auth'
import appConfig from "@/configs/app.config";
//export const URL = 'https://d10fm4zdopeh6z.cloudfront.net/api/v1/user'
export const URL = `${appConfig.apiPrefix}/user`
//export const URL = 'http://127.0.0.1:9000/api/v1/user'
export async function apiSignIn(data: SignInCredential) {
    console.log(`${URL}/sign-in`)
    console.log(data);
    return ApiService.fetchData<SignInResponse>({
        url: `${URL}/sign-in`,
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignUpResponse>({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
    })
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data: ResetPassword) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
