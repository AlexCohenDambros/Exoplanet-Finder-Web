import { ScatterPlotComponent } from './features/scatter-plot/scatter-plot.component';
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
import { NgChartsModule } from 'ng2-charts';
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
    ScatterPlotComponent,
    HomeTranslateComponent,
    OptionTabsComponent,
    TelescopeTessComponent,
    TelescopeKeplerComponent,
    TelescopeK2Component,
    SelectModelsComponent,
    ModalInputFilesComponent,
    TableComponent
  ],
  imports: [
    NgChartsModule,
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
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatDividerModule,
    MatTableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
