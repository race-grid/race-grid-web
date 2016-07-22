import {Injectable, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {OverviewService} from "./overview.service";
import {Subject} from "rxjs/Rx";
import {RacegridCookieService} from "./cookie.service";
import {Session} from "../common";


@Injectable()
export class SessionService {

    session: Session;
    loggedIn$: Subject<string> = new Subject<string>();
    loggedOut$: Subject<void> = new Subject<void>();


    constructor(private cookieService: RacegridCookieService,
                private overviewService: OverviewService) {
        this.init();
    }

    init() {
        let userName = this.cookieService.getUserName();
        let userId = this.cookieService.getUserId();
        let userHash = this.cookieService.getUserHash();
        if (userName) {
            this.session = {
                userName: userName,
                userId: userId,
                userHash: userHash
            }
        }
    }

    getSession(): Session {
        return this.session;
    }

    setLoggedIn(userName: string, userId: string, userHash: string) {
        this.cookieService.setUserName(userName);
        this.cookieService.setUserId(userId);
        this.cookieService.setUserHash(userHash);
        this.session = {
            userName: userName,
            userId: userId,
            userHash: userHash
        };
        this.overviewService.updateUsers();
        this.loggedIn$.next(userName);
    }

    setLoggedOut(): void {
        this.cookieService.removeUserName();
        this.cookieService.removeUserId();
        this.cookieService.removeUserHash();
        this.session = null;
        this.overviewService.updateUsers();
        this.loggedOut$.next(null);
    }
}