import {Component, OnInit} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {NewGameComponent} from "./new-game/new-game.component";
import {SessionService} from "./service/session.service";
import {SessionComponent} from "./session/session.component";
import {CountListComponent} from "./count-list/count-list.component";
import {ApiClientService} from "./service/api-client.service";
import {NewUserResponse, Session} from "./common";
import {OverviewService} from "./service/overview.service";

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
            <new-game *ngIf="session != null"></new-game>
            <div class="row">
                <div class="col-xs-4">
                    <count-list [items]="games" title="Games"></count-list>
                </div>
                <div class="col-xs-4">
                    <count-list [items]="lobbies" title="Lobbies"></count-list>
                </div>
                <div class="col-xs-4">
                    <count-list [items]="users" title="Users"></count-list>
                </div>
            </div>
           
            <overview></overview>
        </div>
    `,
    directives: [HeaderComponent,
        NewGameComponent,
        SessionComponent,
        CountListComponent]
})

export class AppComponent implements OnInit {

    session: Session;
    games: string[] = [];
    users: string[] = [];
    lobbies: string[] = [];

    constructor(private sessionService: SessionService,
                private overviewService: OverviewService,
                private apiClient: ApiClientService) {
    }

    ngOnInit() {
        this.session = this.sessionService.getSession();

        this.overviewService.gamesChange$.subscribe(games => {
            this.games = games;
        });
        this.overviewService.lobbiesChange$.subscribe(lobbies => {
            this.lobbies = lobbies;
        });
        this.overviewService.usersChange$.subscribe(users => {
            this.users = users;
        });
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
        this.apiClient.removeUser(this.session.userId, this.session.userHash).then(() => {
            this.sessionService.setLoggedOut();
            this.session = null;
        });

    }

}