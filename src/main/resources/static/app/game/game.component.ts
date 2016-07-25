import {Component, OnInit} from "@angular/core";
import {SessionService} from "../service/session.service";
import {Session} from "../common";

@Component({
    selector: 'game',
    template: `
        <div class="row">
            <div class="col-xs-12">
                Currently in game with ID: '{{session.gameId}}'
            </div>
            
        </div>
    `
})
export class GameComponent implements OnInit {

    session: Session;

    constructor(private sessionService: SessionService) {
    }

    ngOnInit(): any {
        this.session = this.sessionService.getSession();
        this.sessionService.sessionChange$.subscribe(session => this.session = session);
        console.log(this.session);
    }
}