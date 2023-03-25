import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  public isDarkMode = new BehaviorSubject<boolean>(false);

  public setIsDarkMode(isDarkMode: boolean): void {
    this.isDarkMode.next(isDarkMode);
  }

  public getIsDarkMode() {
    return this.isDarkMode.asObservable();
  }
}
