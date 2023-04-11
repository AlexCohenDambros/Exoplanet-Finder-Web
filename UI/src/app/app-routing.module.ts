import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './shared/test/test.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home-page/home.component';
import { NotFoundComponent } from './shared/http-errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/http-errors/server-error/server-error.component';
import { JoinComponent } from './features/join/join.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  {path: '500', component: ServerErrorComponent},
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'join', component: JoinComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
