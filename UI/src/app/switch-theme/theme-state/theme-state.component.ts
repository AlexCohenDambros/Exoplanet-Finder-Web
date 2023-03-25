import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-state',
  templateUrl: './theme-state.component.html',
  styleUrls: ['./theme-state.component.scss']
})
export class ThemeStateComponent {
  isDarkMode!: boolean;

  constructor() {
    // Se o valor de isDarkMode ainda não foi definido, inicialize com false (modo claro)
    this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode') ?? 'false');

  }
}
