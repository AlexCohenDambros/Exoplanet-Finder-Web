import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalInputFilesComponent } from 'src/app/shared/modal-input-files/modal-input-files.component';
import { ApiService } from 'src/app/configuration/API/api.service';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-select-models',
  templateUrl: './select-models.component.html',
  styleUrls: ['./select-models.component.scss']
})
export class SelectModelsComponent implements OnInit{
  modelsDict: {[key: string]: number} = {};
  model: any;
  vision: any;
  telescope: any;
  ELEMENT_DATA: PeriodicElement[] = [
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
  ]

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  modelsModel = [
    { value: 1, name: 'example' },

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

  target = new FormControl([]);
  targetsList: string[] = [];

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalInputFilesComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Importação feita com sucesso');
    });
  }
  public get selectedTargets() {
    return this.target.value;
  }
  public cleanForms(): void {
    this.model = null;
    this.vision = null;
    this.telescope = null;
    this.target = new FormControl([]);
    this.ELEMENT_DATA = [];
    this.targetsList=[];
  }

  public submitForms(): void {
    console.log(this.model);
    console.log(this.vision);
    console.log(this.telescope);
    console.log(this.selectedTargets);
  }

  dataSource = this.ELEMENT_DATA;
  public getModels() {
    let new_dict:any = {}
    this.apiService.getModels().subscribe(data => {
      for (const chave in data.list_models){
        new_dict[chave] = data.list_models[chave];
      }
      this.modelsModel = new_dict;
      });
    }
    ngOnInit() {
      this.apiService.getModels().subscribe(data => {
        const list_models = data.list_models;
        this.modelsModel = list_models.map((model:any, index:any) => {
          return { value: index + 1, name: model };
        });
      });
    }

    public onTelescopeChange(event: any) {
      this.apiService.getTargets(this.telescope).subscribe(data => {
        this.targetsList = data.list_targets;
      })
    }

}
