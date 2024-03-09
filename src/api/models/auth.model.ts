export interface UserLoginResponse {
    email: string | null;
    access_token: string | null;
    refresh_token: string | null;
}

export interface UserSignupResponse extends UserLoginResponse {}