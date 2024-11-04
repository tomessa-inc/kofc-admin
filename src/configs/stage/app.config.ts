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
    apiPrefix: 'https://api-stage.kofc9544.ca',
    webPrefix: 'https://stage.kofc9544.ca',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
