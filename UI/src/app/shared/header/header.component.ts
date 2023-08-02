import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../translate/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  constructor(
    public languageService: LanguageService,
    public router: Router) { }

  public goHome(): void {
    this.router.navigate(['/home']);
  }
}
