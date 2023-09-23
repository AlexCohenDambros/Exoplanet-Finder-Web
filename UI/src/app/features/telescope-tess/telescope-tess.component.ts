import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-telescope-tess',
  templateUrl: './telescope-tess.component.html',
  styleUrls: ['./telescope-tess.component.scss']
})
export class TelescopeTessComponent {

  constructor(
    private readonly router: Router
  ) { }

  public openScatterPlot(): void {
    this.router.navigate(['scatter-plot']);
  }

  public onBack(): void {
    this.router.navigate(['home']);
  }

}
