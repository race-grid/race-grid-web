import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import {CookieService} from "angular2-cookie/core";
import {ApiClientService} from "./service/api-client.service";
import {OverviewService} from "./service/overview.service";
import {SessionService} from "./service/session.service";
import {RacegridCookieService} from "./service/cookie.service";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    CookieService,
    ApiClientService,
    OverviewService,
    SessionService,
    RacegridCookieService
]);