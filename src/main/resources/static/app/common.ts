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
    gameId?: string;
    raceTrack?: RaceTrack;
}

export interface Game {
    id: string;
    users: User[];
}

export interface Line {
    from: Vector;
    to: Vector;
}

export interface Vector {
    x: number;
    y: number;
}

export interface RaceTrack {
    walls: Line[];
    height: number;
    width: number;
    goalLine: Line[];
    startPositions: Vector[];
}