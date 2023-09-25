import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})
export class GraphPageComponent {

  @ViewChild('drawer') drawer!: MatDrawer;

  selectedObservationsModel: any[] = [];

  tessObservationsModel = [
    { value: 1, name: 'ID 1' },
    { value: 2, name: 'ID 2' },
    { value: 3, name: 'ID 3' },
    { value: 4, name: 'ID 4' },
    { value: 5, name: 'ID 5' },
    { value: 6, name: 'ID 6' },
    { value: 7, name: 'ID 7' },
    { value: 8, name: 'ID 8' },
    { value: 9, name: 'ID 9' },
    { value: 10, name: 'ID 10' },
    { value: 11, name: 'ID 11' },
  ];

  k2ObservationsModel = [
    { value: 1, name: 'ID 1' },
    { value: 2, name: 'ID 2' },
    { value: 3, name: 'ID 3' },
    { value: 4, name: 'ID 4' },
    { value: 5, name: 'ID 5' },
  ];

  keplerObservationsModel = [
    { value: 1, name: 'ID 1' },
    { value: 2, name: 'ID 2' },
    { value: 3, name: 'ID 3' },
    { value: 4, name: 'ID 4' },
    { value: 5, name: 'ID 5' },
    { value: 6, name: 'ID 6' },
    { value: 7, name: 'ID 7' },
    { value: 8, name: 'ID 8' },
  ];

  telescopeModel = [
    { value: 1, name: 'TESS' },
    { value: 2, name: 'K2' },
    { value: 3, name: 'Kepler' },
  ]

  toggleDrawer() {
    if (this.drawer.opened) {
      this.drawer.close();
    } else {
      this.drawer.open();
    }
  }

  onSelectChange(event: any) {
    const selectedName = event.value;

    switch (selectedName) {
      case 'TESS':
        this.selectedObservationsModel = this.tessObservationsModel;
        break;
      case 'K2':
        this.selectedObservationsModel = this.k2ObservationsModel;
        break;
      case 'Kepler':
        this.selectedObservationsModel = this.keplerObservationsModel;
        break;
      default:
        this.selectedObservationsModel = [];
        break;
    }
  }
}
