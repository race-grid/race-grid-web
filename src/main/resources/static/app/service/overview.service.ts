import {Injectable, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {ApiClientService} from "./api-client.service";
import {Subject} from "rxjs/Rx";
import {Game} from "../common";


@Injectable()
export class OverviewService {

    private users: string[] = [];
    private games: Game[] = [];
    private lobbies: any[] = [];

    usersChange$: Subject<string[]> = new Subject<string[]>();
    gamesChange$: Subject<Game[]> = new Subject<Game[]>();
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

    private setGames(games: Game[]){
        this.gamesChange$.next(games);
        this.games = games;
    }

    private setUsers(users: string[]){
        this.users = users;
        this.usersChange$.next(users);
    }

    private setLobbies(lobbies: any[]) {
        this.lobbies = lobbies;
        this.lobbiesChange$.next(lobbies);
    }

    getGames(): Game[] {
        return this.games
    }

    getUsers(): string[] {
        return this.users;
    }

    getLobbies(): any[] {
        return this.lobbies;
    }
}