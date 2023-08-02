import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/shared/translate/language.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly languageService: LanguageService
  ) { }

  public ngOnInit(): void {
    this.languageService.setInitialLanguage();
  }
}
