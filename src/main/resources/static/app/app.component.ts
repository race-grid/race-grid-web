import {Component} from '@angular/core';
import {HeaderComponent} from './header/header.component'
import {OverviewService} from './overview.service'
import {OnInit} from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <header></header>
        <p>{{games.length}} games right now...</p>
        <p>{{users.length}} users online...</p>
        <ul>
            <li *ngFor="let user of users">
                {{user}}
            </li>
        </ul>
    `,
    directives: [HeaderComponent],
    providers: [OverviewService]
})

export class AppComponent implements OnInit {

    games: string[] = [];
    users: string[] = [];

    constructor(private overviewService: OverviewService) {}

    ngOnInit() {
        this.overviewService.getGames().then(games => this.games = games.json());
        this.overviewService.getUsers().then(users => this.users = users.json());
    }

}