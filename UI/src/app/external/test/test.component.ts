import { Component } from '@angular/core';
import { ThemeService } from '../../shared/switch-theme/theme.service';
import { LanguageService } from '../../shared/translate/language.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  constructor(
    private languageService: LanguageService,
    public themeService: ThemeService) {
  }

  public changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }
}
