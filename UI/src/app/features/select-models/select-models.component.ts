import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalInputFilesComponent } from 'src/app/shared/modal-input-files/modal-input-files.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-select-models',
  templateUrl: './select-models.component.html',
  styleUrls: ['./select-models.component.scss']
})
export class SelectModelsComponent {

  model: any;
  vision: any;
  telescope: any;

  constructor(
    public dialog: MatDialog
  ) { }

  modelsModel = [
    { value: 1, name: 'AdaBoost' },
    { value: 2, name: 'Xgboost' },
    { value: 3, name: 'SVM' },
  ];

  visionModel = [
    { value: 1, name: 'Global' },
    { value: 2, name: 'Local' },
    { value: 3, name: 'Ambas' },
  ];

  telescopeModel = [
    { value: 1, name: 'TESS' },
    { value: 2, name: 'K2' },
    { value: 3, name: 'KEPLER' },
  ];

  target = new FormControl('');
  targetsList: string[] = ['20021', '84234', '57201', '162842', '0128745', '272932'];

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalInputFilesComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Importação feita com sucesso');
    });
  }

  public cleanForms(): void {
    this.model = null;
    this.vision = null;
    this.telescope = null;
    this.target = new FormControl('');
  }

  public submitForms(): void {
    console.log(this.model);
    console.log(this.vision);
    console.log(this.telescope);
    console.log(this.target.value);
  }

  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol', 'demo-graphic'];
  dataSource = ELEMENT_DATA;

}
