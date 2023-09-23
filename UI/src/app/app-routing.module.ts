import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/http-errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/http-errors/server-error/server-error.component';
import { OptionTabsComponent } from './shared/option-tabs/option-tabs.component';
import { ScatterPlotComponent } from './features/scatter-plot/scatter-plot.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: OptionTabsComponent },
  { path: 'scatter-plot', component: ScatterPlotComponent },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
