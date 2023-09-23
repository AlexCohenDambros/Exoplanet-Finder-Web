import { Component } from '@angular/core';
import { LanguageService } from 'src/app/shared/translate/language.service';

@Component({
  selector: 'app-home-translate',
  templateUrl: './home-translate.component.html',
  styleUrls: ['./home-translate.component.scss']
})

export class HomeTranslateComponent {

  constructor(private languageService: LanguageService) { }

  selectedOption!: number;

  languages = [
    { value: 1, label: 'translate.portuguese', icon: './assets/flags/brazil.png' },
    { value: 2, label: 'translate.english', icon: './assets/flags/eua.png' },
    { value: 3, label: 'translate.german', icon: './assets/flags/germany.png' },
    { value: 4, label: 'translate.china', icon: './assets/flags/china.png' },
    { value: 5, label: 'translate.spanish', icon: './assets/flags/spain.png' },
  ];

  private saveAndChangeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);

    localStorage.setItem('selectedLanguage', lang);
  }

  public onLanguageSelected(): void {
    console.log('selectedOpetion', this.selectedOption);
    switch (this.selectedOption) {
      case 1:
        this.saveAndChangeLanguage('pt');
        break;
      case 2:
        this.saveAndChangeLanguage('en-US');
        break;
      case 3:
        this.saveAndChangeLanguage('al')
        break;
      case 4:
        this.saveAndChangeLanguage('ch')
        break;
      case 5:
        this.saveAndChangeLanguage('es')
        break;
      default:
        this.saveAndChangeLanguage('pt');
        break;
    }
  }
}
