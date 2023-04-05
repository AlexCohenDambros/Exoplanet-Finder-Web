import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './features/http-errors/not-found/not-found.component';
import { ServerErrorComponent } from './features/http-errors/server-error/server-error.component';
import { TestComponent } from './shared/test/test.component';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  {path: '500', component: ServerErrorComponent},
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
