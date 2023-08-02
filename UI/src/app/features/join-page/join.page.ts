import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/shared/translate/language.service';

@Component({
  selector: 'app-join-page',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss']
})

export class JoinComponent implements OnInit {

  constructor(
    private readonly languageService: LanguageService
  ) { }

  public ngOnInit(): void {
    this.languageService.setInitialLanguage();

  }
}
