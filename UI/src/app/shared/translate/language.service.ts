import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  constructor(private translateService: TranslateService) { }

  public setLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  public setInitialLanguage(): void {
    const selectedLanguage = localStorage.getItem('selectedLanguage');

    this.setLanguage(selectedLanguage ?? 'pt');
  }
}
