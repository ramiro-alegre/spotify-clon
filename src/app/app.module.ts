import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritePageComponent } from './modules/favorites/favorite-page/favorite-page.component';


@NgModule({
  declarations: [ //Declaraciones: Componentes, directivas, pipes
    AppComponent
  ],
  imports: [ //Solo se importan otros modulos
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
