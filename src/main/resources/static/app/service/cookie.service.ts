import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {CookieService} from "angular2-cookie/core";

type CookieKey = 'userName' | 'userId' | 'userHash' | 'gameId';

export class RacegridCookie {
    static USER_NAME: CookieKey = 'userName';
    static USER_ID: CookieKey = 'userId';
    static USER_HASH: CookieKey = 'userHash';
    static GAME_ID: CookieKey = 'gameId';
}

@Injectable()
export class RacegridCookieService {


    constructor(private cookieService: CookieService) {
    }

    put(key: CookieKey, value: any) {
        this.cookieService.put(key, value);
    }

    get(key: CookieKey): string {
        return this.cookieService.get(key);
    }

    remove(key: CookieKey): void {
        this.cookieService.remove(key);
    }
}