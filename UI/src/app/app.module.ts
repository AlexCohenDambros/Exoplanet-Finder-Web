import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './features/home-page/home.page';
import { ServerErrorComponent } from './shared/http-errors/server-error/server-error.component';
import { HeaderComponent } from './shared/header/header.component';
import { NotFoundComponent } from './shared/http-errors/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeTranslateComponent } from './shared/header/components/home-translate/home-translate.component';
import { OptionTabsComponent } from './shared/option-tabs/option-tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TelescopeTessComponent } from './features/telescope-tess/telescope-tess.component';
import { TelescopeKeplerComponent } from './features/telescope-kepler/telescope-kepler.component';
import { TelescopeK2Component } from './features/telescope-k2/telescope-k2.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SelectModelsComponent } from './features/select-models/select-models.component';
import { ModalInputFilesComponent } from './shared/modal-input-files/modal-input-files.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './features/table/table.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ExoplanetTabsComponent } from './shared/telescopes-tabs/exoplanet-tabs.component';
import { ExoplanetInfoComponent } from './shared/exoplanet-info/exoplanet-info.component';
import { InitialComponentComponent } from './shared/initial-component/initial-component.component';
import { UsingModelsComponent } from './shared/using-models/using-models.component';
import { XgboostComponent } from './features/xgboost/xgboost.component';
import { SvmComponent } from './features/svm/svm.component';
import { AdaboostComponent } from './features/adaboost/adaboost.component';
import { VisionComponent } from './shared/vision/vision.component';
import { LocalvisionComponent } from './features/localvision/localvision.component';
import { GlobalvisionComponent } from './features/globalvision/globalvision.component';
import { GraphPageComponent } from './features/graph-page/graph-page.component';
import { SelectSectorComponent } from './shared/select-sector/select-sector.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VisualizeGraphComponent } from './shared/visualize-graph/visualize-graph.component';
import { MatTooltipModule } from '@angular/material/tooltip';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    ServerErrorComponent,
    HomeComponent,
    HomeTranslateComponent,
    OptionTabsComponent,
    TelescopeTessComponent,
    TelescopeKeplerComponent,
    TelescopeK2Component,
    SelectModelsComponent,
    ModalInputFilesComponent,
    TableComponent,
    ExoplanetTabsComponent,
    ExoplanetInfoComponent,
    InitialComponentComponent,
    UsingModelsComponent,
    XgboostComponent,
    SvmComponent,
    AdaboostComponent,
    VisionComponent,
    LocalvisionComponent,
    GlobalvisionComponent,
    GraphPageComponent,
    SelectSectorComponent,
    VisualizeGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    //// Angular Material
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatDividerModule,
    MatTableModule,
    MatListModule,
    RouterModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
