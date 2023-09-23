import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-telescope-kepler',
  templateUrl: './telescope-kepler.component.html',
  styleUrls: ['./telescope-kepler.component.scss']
})
export class TelescopeKeplerComponent implements OnInit, OnDestroy {

  constructor() { }
  private chartInstance: Chart | null = null;

  ngOnInit() {
    console.log("instance", this.chartInstance)
  }

  ngOnDestroy(): void {
    console.log("instance", this.chartInstance)
  }
}
