import {Component, Input} from '@angular/core';
import {SessionComponent} from "../session/session.component";

@Component({
    selector: 'header',
    template: `
        <p></p>
        <div class="row">
            <div class="col-xs-12">
                <div class="pull-right">
                    <ng-content></ng-content>
                </div>
                <h1>{{title}}</h1>
            </div>
        </div>
        <hr>`,
    directives: [SessionComponent]
})

export class HeaderComponent {
    @Input() title: string;
}