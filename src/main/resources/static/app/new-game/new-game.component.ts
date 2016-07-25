import {Component, Output} from '@angular/core';
import {EventEmitter} from "@angular/compiler/src/facade/async";

@Component({
    selector: 'new-game',
    template: `
                <div class="row">
                    <div class="col-xs-12">
                        <div class="well well-sm">
                            Start playing
                            <button (click)="newVsAi.emit()" class="btn btn-default">vs AI</button>
                            <button class="btn btn-default disabled">vs players</button>
                        </div>
                    </div>
                </div>
    `
})

export class NewGameComponent {
    @Output() newVsAi = new EventEmitter<void>();
}