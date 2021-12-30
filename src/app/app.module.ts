import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritePageComponent } from './modules/favorites/favorite-page/favorite-page.component';


@NgModule({
  declarations: [ //Declaraciones: Componentes, directivas, pipes
    AppComponent, FavoritePageComponent,
  ],
  imports: [ //Solo se importan otros modulos
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
