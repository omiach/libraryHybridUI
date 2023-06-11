export interface AuthResult {
    token: string;
    refreshToken: string;
    succeeded: boolean;
    twoFactorCodeRequired: boolean;
    errors: string[];
}
