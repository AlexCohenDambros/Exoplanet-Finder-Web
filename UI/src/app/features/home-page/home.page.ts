import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/translate/language.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomeComponent implements OnInit {
  selectedOption!: number;

  constructor(
    public languageService: LanguageService,
    private route: Router) { }

  public ngOnInit(): void {
    this.languageService.setInitialLanguage();
  }

  public goToTelescopesPage(): void {
    this.route.navigate(['/telescopes']);
  }

  public goToExoplanetPage(): void {
    this.route.navigate(['/exoplanet']);
  }

  public goToModelsPage(): void {
    this.route.navigate(['/models']);
  }
  public goToHome(): void {
    this.route.navigateByUrl('/home');
  }
  public goToVision(): void {
    this.route.navigateByUrl('/vision');
  }
}
