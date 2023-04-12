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
import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './shared/test/test.component';
import { ThemeService } from './shared/switch-theme/theme.service';
import { HeaderComponent } from './shared/header/header.component';
import { NotFoundComponent } from './shared/http-errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/http-errors/server-error/server-error.component';
import { HomeComponent } from './features/home-page/home.page';
import { ThemeStateComponent } from './shared/switch-theme/components/theme-state/theme-state.component';
import { LoginComponent } from './features/login-page/login.page';
import { JoinComponent } from './features/join-page/join.page';

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
    TestComponent,
    ThemeStateComponent,
    LoginComponent,
    JoinComponent
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
    //// Angular Material
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
