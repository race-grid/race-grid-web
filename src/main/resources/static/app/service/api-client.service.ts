import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {NewUserResponse, Session} from "../common";

@Injectable()
export class ApiClientService {

    API_URL = 'http://localhost:8082/api';
    //API_URL = 'https://racegrid-api.herokuapp.com/api';

    constructor(private http: Http) {
    }

    private get(url: string): Promise<any> {
        return this.http.get(this.API_URL + url)
            .toPromise()
            .then(res => res.json());
    }

    private post(url: string): Promise<Response> {
        return this.http.post(this.API_URL + url, null)
            .toPromise();
    }

    getGames(): Promise<any[]> {
        return this.get('/games');
    }

    getUsers(): Promise<any[]> {
        return this.get('/users');
    }

    createUser(name: string): Promise<NewUserResponse> {
        return this.post('/create-user?name=' + name)
            .then(res => res.json());
    }

    getLobbies(): Promise<any[]> {
        return Promise.resolve([]);
    }

    removeUser(userId: string, userHash: string): Promise<any> {
        return this.post('/remove-user?userId=' + userId + '&userHash=' + userHash);
    }

    newGameVsAi(session: Session, numOpponents: number): Promise<string> {
        return this.post('/new-game-vs-ai?userId=' + session.userId + '&userHash=' + session.userHash + '&numOpponents=' + numOpponents)
            .then(response => {
                let data = response.json();
                return response.json()
            });
    }
}