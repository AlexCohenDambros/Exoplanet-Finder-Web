export class ThemeService {
  isDarkTheme = true;

  public setDarkTheme(isDarkTheme: boolean): void {
    this.isDarkTheme = isDarkTheme;
  }

  public toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
