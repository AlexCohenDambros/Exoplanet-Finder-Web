import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ThemeStateComponent } from '../switch-theme/components/theme-state/theme-state.component';
import { ThemeService } from '../switch-theme/theme.service';
import { LanguageService } from '../translate/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  themeState!: ThemeStateComponent
  selectedOption!: number;

  constructor(
    public themeService: ThemeService,
    public languageService: LanguageService,
    public router: Router,
    ) {
      this.themeState = new ThemeStateComponent();
     }

     languages = [
      {value: 1, label: 'translate.portuguese', icon: './assets/flags/brazil.png'},
      {value: 2, label: 'translate.english', icon: './assets/flags/eua.png'},
      {value: 3, label: 'translate.german', icon: './assets/flags/germany.png'},
      {value: 4, label: 'translate.china', icon: './assets/flags/china.png'},
      {value: 5, label: 'translate.spanish', icon: './assets/flags/spain.png'},
    ];

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  toggleTheme() {
   this.themeService.getIsDarkMode()
    .pipe(take(1))
    .subscribe(isDarkMode => {
      this.themeService.setIsDarkMode(!isDarkMode);
    });
  }

  public changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }

  public onLanguageSelected(): void {
    switch(this.selectedOption) {
      case 1:
        console.log("portugues selecionado");
        this.changeLanguage('pt');
        break;
      case 2:
        console.log("ingles selecionado");
        this.changeLanguage('en-US');
        break;
      case 3:
        console.log("alemao selecionado");
        this.changeLanguage('al')
        break;
      case 4:
        console.log("chines selecionado");
        this.changeLanguage('ch')
        break;
      case 5:
        console.log("espanhol selecionado");
        this.changeLanguage('es')
        break;
      default:
        this.changeLanguage('pt');
        break;
    }
  }

}
