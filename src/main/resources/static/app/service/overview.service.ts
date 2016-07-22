import {Injectable, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {ApiClientService} from "./api-client.service";
import {Subject} from "rxjs/Rx";


@Injectable()
export class OverviewService {

    usersChange$: Subject<string[]> = new Subject<string[]>();
    gamesChange$: Subject<any[]> = new Subject<any[]>();
    lobbiesChange$: Subject<any[]> = new Subject<any[]>();

    constructor(private apiClientService: ApiClientService) {
        this.init();
    }

    init() {
        this.updateGames();
        this.updateUsers();
    }

    updateGames() {
        this.apiClientService.getGames().then(games => this.setGames(games));
    }

    updateUsers() {
        this.apiClientService.getUsers().then(users => this.setUsers(users));
    }

    updateLobbies() {
        this.apiClientService.getLobbies().then(lobbies => this.setLobbies(lobbies));
    }

    private setGames(games){
        this.gamesChange$.next(games);
    }

    private setUsers(users){
        this.usersChange$.next(users);
    }

    private setLobbies(lobbies) {
        this.lobbiesChange$.next(lobbies);
    }
}