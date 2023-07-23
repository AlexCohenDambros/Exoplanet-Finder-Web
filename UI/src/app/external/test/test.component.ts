import { Component } from '@angular/core';
import { LanguageService } from '../../shared/translate/language.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  constructor(
    private languageService: LanguageService) {
  }

  public changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }
}
