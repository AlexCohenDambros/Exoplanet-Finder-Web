import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../translate/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  selectedOption!: number;
  selectedLanguage!: any;

  constructor(
    public languageService: LanguageService,
    public router: Router) { }

  languages = [
    { value: 1, label: 'translate.portuguese', icon: './assets/flags/brazil.png' },
    { value: 2, label: 'translate.english', icon: './assets/flags/eua.png' },
    { value: 3, label: 'translate.german', icon: './assets/flags/germany.png' },
    { value: 4, label: 'translate.china', icon: './assets/flags/china.png' },
    { value: 5, label: 'translate.spanish', icon: './assets/flags/spain.png' },
  ];

  public goHome(): void {
    this.router.navigate(['/home']);
  }

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
