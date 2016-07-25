import {provideRouter, RouterConfig} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {GameComponent} from "./game/game.component";

const routes: RouterConfig = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'game', component: GameComponent}
];

export const appRouterProviders = [
    provideRouter(routes)
];