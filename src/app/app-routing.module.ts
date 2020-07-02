import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', loadChildren: () =>  import('./modules/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'home', loadChildren: () =>  import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: '**', redirectTo: '404'
  }, {
    path: '404', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
