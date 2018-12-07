import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { MessagesComponent } from './messages/messages.component';




const appRoutes: Routes =[
  {
      path :'',
      component : HomeComponent
    },
  {
      path :'game',
      component : GameComponent
  },
  {
      path :'messages',
      component : MessagesComponent
  },
  { path: '**', redirectTo: '' }

];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
