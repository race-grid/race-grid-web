import {Component, OnInit, Input} from "@angular/core";
import {Session, Game} from "../common";
import {CountListComponent} from "../count-list/count-list.component";
import {NewGameComponent} from "../new-game/new-game.component";
import {OverviewService} from "../service/overview.service";
import {ApiClientService} from "../service/api-client.service";
import {SessionService} from "../service/session.service";
import {Router} from "@angular/router";

@Component({
    selector: 'home',
    template: `
            <new-game *ngIf="session && !session.gameId" (newVsAi)="onNewGameVsAi()">
            </new-game>
            
            <div class="row">
                <div class="col-sm-4">
                    <count-list [items]="games" title="Games"></count-list>
                </div>
                <div class="col-sm-4">
                    <count-list [items]="lobbies" title="Lobbies"></count-list>
                </div>
                <div class="col-sm-4">
                    <count-list [items]="users" title="Users"></count-list>
                </div>
            </div>
    `,
    directives: [
        NewGameComponent,
        CountListComponent
    ]
})
export class HomeComponent implements OnInit {

    session: Session;
    games: string[] = [];
    users: string[] = [];
    lobbies: any[] = [];

    constructor(private router: Router,
                private sessionService: SessionService,
                private overviewService: OverviewService,
                private apiClient: ApiClientService) {
    }

    ngOnInit() {
        this.session = this.sessionService.getSession();
        this.games = this.overviewService.getGames().map(this.gameString);
        this.lobbies = this.overviewService.getLobbies();
        this.users = this.overviewService.getUsers();

        this.overviewService.gamesChange$.subscribe((games: Game[]) =>
            this.games = games.map(this.gameString)
        );
        this.overviewService.lobbiesChange$.subscribe(lobbies =>
            this.lobbies = lobbies
        );
        this.overviewService.usersChange$.subscribe(users =>
            this.users = users
        );
        this.sessionService.sessionChange$.subscribe(session =>
            this.session = session
        );
    }

    gameString(game: Game) {
        let users = game.users.map(u => u.name);
        return `${users.length} player(s): ${users.join(', ')}`
    }

    onNewGameVsAi() {
        this.apiClient.newGameVsAi(this.session, 1).then(gameId => {
            this.overviewService.updateGames();
            this.sessionService.setInGame(gameId);
            this.router.navigate(['/game']);
        });

    }
}