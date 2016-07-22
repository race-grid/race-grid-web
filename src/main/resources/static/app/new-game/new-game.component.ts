import {Component} from '@angular/core';

@Component({
    selector: 'new-game',
    template: `
                <div class="row">
                    <div class="col-xs-12">
                        <div class="well well-sm">
                            Start playing
                            <button class="btn btn-default">vs AI</button>
                            <button class="btn btn-default disabled">vs players</button>
                        </div>
                    </div>
                </div>
    `,
    providers: []
})

export class NewGameComponent {

}