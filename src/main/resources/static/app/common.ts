export interface NewUserResponse {
    user: User;
    userHash: string;
    createdNewUser: boolean;
}

export interface User {
    name: string;
    id: string;
}

export interface Session {
    userName: string;
    userId: string;
    userHash: string;
}