import {Component, Input} from '@angular/core';
import {SessionComponent} from "../session/session.component";

@Component({
    selector: 'count-list',
    template: `
        <div class="well well-sm">
            <p>{{title}} <span class="badge">{{items.length}}</span></p>
            <ul class="list-group">
                <li *ngFor="let item of items" class="list-group-item">
                    {{item}}
                </li>
            </ul>
        </div>`
})

export class CountListComponent {
    @Input() title: string;
    @Input() items: string[];
}