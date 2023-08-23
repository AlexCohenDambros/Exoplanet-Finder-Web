import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/http-errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/http-errors/server-error/server-error.component';
import { TestComponent } from './external/test/test.component';
import { OptionTabsComponent } from './shared/option-tabs/option-tabs.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: OptionTabsComponent },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: 'test', component: TestComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
