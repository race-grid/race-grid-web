import {Injectable, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {OverviewService} from "./overview.service";
import {Subject} from "rxjs/Rx";
import {RacegridCookieService, RacegridCookie} from "./cookie.service";
import {Session} from "../common";


@Injectable()
export class SessionService {

    session: Session;
    sessionChange$: Subject<Session> = new Subject<Session>();

    constructor(private cookieService: RacegridCookieService,
                private overviewService: OverviewService) {
        this.init();
    }

    init() {
        let userName = this.cookieService.get(RacegridCookie.USER_NAME);
        let userId = this.cookieService.get(RacegridCookie.USER_ID);
        let userHash = this.cookieService.get(RacegridCookie.USER_HASH);
        let gameId = this.cookieService.get(RacegridCookie.GAME_ID);
        if (userName) {
            this.session = {
                userName: userName,
                userId: userId,
                userHash: userHash,
                gameId: gameId
            }
        }
    }

    getSession(): Session {
        return this.session;
    }

    setLoggedIn(userName: string, userId: string, userHash: string) {
        this.cookieService.put(RacegridCookie.USER_NAME, userName);
        this.cookieService.put(RacegridCookie.USER_ID, userId);
        this.cookieService.put(RacegridCookie.USER_HASH, userHash);
        this.session = {
            userName: userName,
            userId: userId,
            userHash: userHash
        };
        this.overviewService.updateUsers();
        this.sessionChange$.next(this.session);
    }

    setLoggedOut(): void {
        this.cookieService.remove(RacegridCookie.USER_NAME);
        this.cookieService.remove(RacegridCookie.USER_ID);
        this.cookieService.remove(RacegridCookie.USER_HASH);
        this.session = null;
        this.overviewService.updateUsers();
        this.sessionChange$.next(null);
    }

    setInGame(gameId: string): void {
        this.session.gameId = gameId;
        this.cookieService.put(RacegridCookie.GAME_ID, gameId);
    }

    setNotInGame(): void {
        this.session.gameId = null;
        this.cookieService.remove(RacegridCookie.GAME_ID);
    }
}