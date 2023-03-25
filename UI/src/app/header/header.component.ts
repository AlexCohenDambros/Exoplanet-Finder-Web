import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../switch-theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public themeService: ThemeService,
    public router: Router,
    ) { }

  options = [
    {label: 'Opção 1', value: 1},
    {label: 'Opção 2', value: 2},
    {label: 'Opção 3', value: 3},
  ];

  selectedOption!: number;

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public onOptionSelected(): void {
    console.log("Opção selecionada: " + this.selectedOption);

    switch(this.selectedOption) {
      case 1:
        console.log("Opção 1 selecionada");
        break;
      case 2:
        console.log("Opção 2 selecionada");
        break;
      case 3:
        console.log("Opção 3 selecionada");
        break;
      default:
        console.log("Opção inválida selecionada");
        break;
    }
  }

}
