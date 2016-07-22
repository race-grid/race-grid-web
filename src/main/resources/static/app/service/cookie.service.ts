import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {CookieService} from "angular2-cookie/core";

const USERNAME = 'userName';
const USERID = 'userId';
const USERHASH = 'userHash';

@Injectable()
export class RacegridCookieService {


    constructor(private cookieService: CookieService) {
    }

    setUserName(userName: string): void {
        this.cookieService.put(USERNAME, userName);
    }

    getUserName(): string {
        return this.cookieService.get(USERNAME);
    }

    removeUserName(): void {
        this.cookieService.remove(USERNAME);
    }

    setUserId(userId: string): void {
        this.cookieService.put(USERID, userId);
    }

    getUserId(): string {
        return this.cookieService.get(USERID);
    }

    removeUserId(): void {
        this.cookieService.remove(USERID);
    }

    setUserHash(userHash: string): void {
        this.cookieService.put(USERHASH, userHash);
    }

    getUserHash(): string {
        return this.cookieService.get(USERHASH);
    }

    removeUserHash(): void {
        this.cookieService.remove(USERHASH);
    }
}