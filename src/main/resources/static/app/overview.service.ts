import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OverviewService {

    API_URL = 'https://racegrid-api.herokuapp.com/api';

    constructor(private http: Http) {
    }

    getGames() {
        return this.http.get(this.API_URL + '/games').toPromise();
    }

    getUsers() {
        return this.http.get(this.API_URL + '/users').toPromise();
    }
}