import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../translate/language.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})

export class NotFoundComponent implements OnInit {

  constructor(
    private readonly languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.languageService.setInitialLanguage();
  }
}
