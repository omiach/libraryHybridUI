export interface AuthResult {
    token: string;
    refreshToken: string;
    succeeded: boolean;
    errors: string[];
}
