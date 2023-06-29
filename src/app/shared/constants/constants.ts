export interface AuthConstantsInterface{
    ACCES_TOKEN_KEY:string,
    REFRESH_TOKEN_KEY:string
}

export interface MocksKeys{
    USERS:string,
    BOOKS:string
}

export const authConstants:AuthConstantsInterface = {
    ACCES_TOKEN_KEY: 'access_token',
    REFRESH_TOKEN_KEY: 'refresh_token'
}

export const mocksConstants:MocksKeys = {
    USERS: 'mockUsers',
    BOOKS: 'mockBooks'
}
