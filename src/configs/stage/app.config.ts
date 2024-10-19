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
    apiPrefix: 'https://api-stage.tc-testing-check.net',
    webPrefix: 'http://www.tc-testing-check.net',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}

export default appConfig
