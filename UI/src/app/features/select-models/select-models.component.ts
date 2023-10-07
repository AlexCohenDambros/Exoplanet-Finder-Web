import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalInputFilesComponent } from 'src/app/shared/modal-input-files/modal-input-files.component';
import { ApiService } from 'src/app/configuration/API/api.service';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  id: string;
  modelo: string;
  visao: string;
  telescopio: string;
  probabilidade: number;
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
  async submitForms(): Promise<any> {
    let targetListInt: number[] = []
    targetListInt = (this.selectedTargets ?? []).map(str => parseInt(str, 10))
    let d = await this.apiService.getPredictions(this.telescope,targetListInt,this.model,this.vision,false,"")
    d.subscribe(result => {
      let newData = this.converterParaDicionarios(result, this.model, this.vision,this.telescope)
      this.ELEMENT_DATA=newData
    });
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
      this.apiService.getTargets(this.telescope, true).subscribe(data => {
        this.targetsList = data.list_targets;
      })
    }
    public converterParaDicionarios(dados: any, model:string,vision:string, telescope:string): PeriodicElement[] {
      const lista: any[] = [];
      for (let chave in dados) {
          const id = chave;
          const probabilidade = dados[chave];
          lista.push({
            id,
            modelo: model,
            visao: vision,
            telescopio: telescope,
            probabilidade:Math.round(probabilidade*10000)/100
          });
      }

      return lista;
    }

}
