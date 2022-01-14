import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';


const routes: Routes = [
 {
   path: '', // '' = localhost:4200 (Private)
   component: HomePageComponent,
   loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule),
   canActivate:[SessionGuard]
 },
 {
  path: 'auth', // '' = localhost:4200/auth
  loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
