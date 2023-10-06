import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/http-errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/http-errors/server-error/server-error.component';
import { ExoplanetTabsComponent } from './shared/telescopes-tabs/exoplanet-tabs.component';
import { InitialComponentComponent } from './shared/initial-component/initial-component.component';
import { ExoplanetInfoComponent } from './shared/exoplanet-info/exoplanet-info.component';
import { UsingModelsComponent } from './shared/using-models/using-models.component';
import { VisionComponent } from './shared/vision/vision.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: InitialComponentComponent },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: 'telescopes', component: ExoplanetTabsComponent },
  { path: 'exoplanet', component: ExoplanetInfoComponent },
  { path: 'models', component: UsingModelsComponent },
  { path: 'vision', component: VisionComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
