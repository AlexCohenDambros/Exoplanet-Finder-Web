import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/shared/translate/language.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomeComponent implements OnInit {

  selectedOption!: number;

  constructor(
    public languageService: LanguageService) { }

  ngOnInit(): void {
    const selectedLanguage = localStorage.getItem('selectedLanguage');

    switch (selectedLanguage) {
      case 'pt':
        this.languageService.setLanguage('pt');
        break;
      case 'en-US':
        this.languageService.setLanguage('en-US');
        break;
      case 'al':
        this.languageService.setLanguage('al');
        break;
      case 'ch':
        this.languageService.setLanguage('ch');
        break;
      case 'es':
        this.languageService.setLanguage('es');
        break;
      default:
        this.languageService.setLanguage('pt');
        break;
    }
  }
}
