import {Component, OnInit} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {NewGameComponent} from "./new-game/new-game.component";
import {SessionService} from "./service/session.service";
import {SessionComponent} from "./session/session.component";
import {CountListComponent} from "./count-list/count-list.component";
import {ApiClientService} from "./service/api-client.service";
import {NewUserResponse, Session} from "./common";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {GameComponent} from "./game/game.component";

@Component({
    selector: 'app',
    template: `
        <div class="container">
            
            <header title="Race-grid">
                <session [userName]="session? session.userName : ''" 
                    [isLoggedIn]="session != null"
                    (onLogin)="onLogin($event)"
                    (onLogout)="onLogout()">
                </session>
            </header>
            
            <div class="row">
                <div class="col-xs-12">
                    <ul class="nav nav-tabs">
                        <li [routerLinkActive]="['active']"> 
                            <a routerLink="/home">Home</a>
                        </li>
                        <li *ngIf="session && session.gameId" [routerLinkActive]="['active']">
                            <a routerLink="/game">Game</a>
                        </li>
                    </ul> 
                </div>
            </div>
            
            <p></p>
            
            <router-outlet></router-outlet>
            
        </div>
    `,
    directives: [HeaderComponent,
        NewGameComponent,
        SessionComponent,
        CountListComponent,
        ROUTER_DIRECTIVES
    ],
    precompile: [
        HomeComponent,
        GameComponent
    ]
})
export class AppComponent implements OnInit {

    session: Session;

    constructor(private sessionService: SessionService,
                private apiClient: ApiClientService) {
    }

    ngOnInit() {
        this.session = this.sessionService.getSession();
    }

    onLogin(userName: string) {
        this.apiClient.createUser(userName).then((response: NewUserResponse) => {
            if (response.createdNewUser) {
                this.sessionService.setLoggedIn(userName, response.user.id, response.userHash);
                this.session = this.sessionService.getSession();
            }
        })
    }

    onLogout() {
        this.apiClient.removeUser(this.session.userId, this.session.userHash).catch(() => {
        }).then(() => {
            this.sessionService.setLoggedOut();
            this.session = null;
        });
    }

}