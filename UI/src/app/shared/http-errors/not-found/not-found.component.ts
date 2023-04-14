import { Component } from '@angular/core';
import { ThemeService } from '../../switch-theme/theme.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(public themeService: ThemeService) { }
}
