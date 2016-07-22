import {Component, Input, Output} from '@angular/core';
import {EventEmitter} from "@angular/compiler/src/facade/async";

@Component({
    selector: 'session',
    template: `
            <div *ngIf="!isLoggedIn">
                Name: <input #loginName type="text">
                <button (click)="onLogin.emit(loginName.value)" class="btn btn-sm btn-primary">
                    log in
                </button>
            </div>
            <div *ngIf="isLoggedIn">
                <span class="text-muted">Logged in as {{userName}}</span>
                <button (click)="onLogout.emit()" class="btn btn-sm btn-default">
                    log out
                </button>
            </div>
        `
})
export class SessionComponent {

    @Input() private userName: string;
    @Input() private isLoggedIn: boolean;
    @Output() onLogin = new EventEmitter<string>();
    @Output() onLogout = new EventEmitter<void>();
}