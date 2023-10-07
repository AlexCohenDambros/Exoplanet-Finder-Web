import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalInputFilesComponent } from 'src/app/shared/modal-input-files/modal-input-files.component';
import { ModalShowGraphComponent } from 'src/app/shared/modal-show-graph/modal-show-graph.component';
import { ApiService } from 'src/app/configuration/API/api.service';
import { ToastrService } from 'ngx-toastr';
import { ModalShowModelInfoComponent } from 'src/app/shared/modal-show-model-info/modal-show-model-info.component';

export interface PeriodicElement {
  id: string;
  modelo: string;
  visao: string;
  telescopio: string;
  probabilidade: number;
  image: any
}



@Component({
  selector: 'app-select-models',
  templateUrl: './select-models.component.html',
  styleUrls: ['./select-models.component.scss']
})
export class SelectModelsComponent implements OnInit{
  modelsDict: {[key: string]: number} = {};
  model: any = "SVM";
  vision: any = "Global";
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
  ];

  telescopeModel = [
    { value: 1, name: 'TESS' },
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

  openDialogGraph(image: string): void {
    const dialogRef = this.dialog.open(ModalShowGraphComponent, {
      width: '600px',
      data: {
        image:image
      }
    })
  }

  public get selectedTargets() {
    return this.target.value;
  }
  public cleanForms(): void {
    this.telescope = '';
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
      newData.forEach(element => {

        this.ELEMENT_DATA.push(element)
      });

      this.telescope=""
      this.target = new FormControl([]);
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
      if(this.vision && this.telescope){
        this.apiService.getCandidates(this.telescope, this.vision).subscribe(data => {
          this.targetsList = data.list_targets_candidates;
        })
      }
    }
    public converterParaDicionarios(dados: any, model:string,vision:string, telescope:string): PeriodicElement[] {
      const lista: any[] = [];
      for (let chave in dados) {
          const id = chave;
          const probabilidade = dados[chave][0];
          const image = dados[chave][1];
          lista.push({
            id,
            modelo: model,
            visao: vision,
            telescopio: telescope,
            probabilidade:Math.round(probabilidade*10000)/100,
            image:image
          });
      }

      return lista;
    }

    public openDialogInfoModel(vision: string,model:string): void {
      const dialogRef = this.dialog.open(ModalShowModelInfoComponent, {
        width: '100%',
        data : {
          model: model,
          vision: vision
        }
      })
    }
}
