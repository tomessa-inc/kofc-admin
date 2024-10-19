export type AppConfig = {
    apiPrefix: string
    webPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

export const appConfig: AppConfig = {
//s    apiPrefix: `${process.env.REACT_APP_BASE_URL}/api`,
//    apiPrefix: 'http://localhost:9000',
    apiPrefix: 'http://localhost:9000',
    webPrefix: 'http://localhost:4200',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
