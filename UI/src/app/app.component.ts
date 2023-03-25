import { Component } from '@angular/core';
import { LanguageService } from './translate/language.service';
import { ThemeService } from './switch-theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Exoplanet';

  constructor(
    private languageService: LanguageService,
    public themeService: ThemeService) {
  }

  public changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }
}
