import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';



const appRoutes: Routes =[
  {
      path :'',
      component : HomeComponent
    },
  {
      path :'game',
      component : GameComponent
    },
    { path: '**', redirectTo: '' }

];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
