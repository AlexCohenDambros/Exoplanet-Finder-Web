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

  public ngOnInit(): void {
    this.languageService.setInitialLanguage();
  }
}
