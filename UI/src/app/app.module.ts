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
import { ThemeService } from './switch-theme/theme.service';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { NotFoundComponent } from './http-errors/not-found/not-found.component';
import { ServerErrorComponent } from './http-errors/server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { MatSelectModule } from '@angular/material/select';
import { ThemeStateComponent } from './switch-theme/theme-state/theme-state.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    LoginComponent
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
