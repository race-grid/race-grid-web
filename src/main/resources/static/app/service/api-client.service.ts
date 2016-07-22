import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {NewUserResponse} from "../common";

@Injectable()
export class ApiClientService {

    API_URL = 'https://racegrid-api.herokuapp.com/api';

    constructor(private http: Http) {
    }

    private get(url: string): Promise<any> {
        return this.http.get(this.API_URL + url)
            .toPromise()
            .then(res => res.json());
    }

    getGames(): Promise<any[]> {
        return this.get('/games');
    }

    getUsers(): Promise<any[]> {
        return this.get('/users');
    }

    createUser(name: string): Promise<NewUserResponse> {
        return this.http.post(this.API_URL + '/create-user?name=' + name, null)
            .toPromise()
            .then(res => res.json());
    }

    getLobbies(): Promise<any[]> {
        return Promise.resolve([]);
    }

    removeUser(userId: string, userHash: string): Promise<any> {
        return this.http.post(this.API_URL + '/remove-user?userId=' + userId + '&userHash=' + userHash, null)
            .toPromise();
    }
}