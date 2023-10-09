import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalInputFilesComponent } from 'src/app/shared/modal-input-files/modal-input-files.component';
import { ModalShowGraphComponent } from 'src/app/shared/modal-show-graph/modal-show-graph.component';
import { ApiService } from 'src/app/configuration/API/api.service';
import { ToastrService } from 'ngx-toastr';
import { ModalShowModelInfoComponent } from 'src/app/shared/modal-show-model-info/modal-show-model-info.component';
import { ModalAboutSelectModelPageComponent } from 'src/app/shared/modal-about-select-model-page/modal-about-select-model-page.component';

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

export class SelectModelsComponent implements OnInit {
  modelsDict: { [key: string]: number } = {};
  model: any = "SVM";
  vision: any = "Global";
  telescope: any;
  canSee: boolean = false;

  ELEMENT_DATA: PeriodicElement[] = []

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

  ngOnInit() {
    this.apiService.getModels().subscribe(data => {
      const list_models = data.list_models;
      this.modelsModel = list_models.map((model: any, index: any) => {
        return { value: index + 1, name: model };
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalInputFilesComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.toastr.info(`Recarregando lista de modelos...`, 'Carregando...', {
        closeButton: true,
        timeOut: 2000,
        positionClass: 'toast-top-center'
      });

      this.apiService.getModels().subscribe(data => {
        const list_models = data.list_models;
        this.modelsModel = list_models.map((model: any, index: any) => {
          return { value: index + 1, name: model };
        });
      });

      this.toastr.success('Lista de modelos atualizada!', 'Sucesso', {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
    });
  }

  openDialogGraph(image: string): void {
    this.dialog.open(ModalShowGraphComponent, {
      width: '600px',
      data: {
        image: image
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
    this.targetsList = [];
  }

  async submitForms(): Promise<any> {
    this.toastr.info(`Carregando predições`, 'Carregando...', {
      closeButton: true,
      timeOut: 2000,
      positionClass: 'toast-top-center'
    });

    let targetListInt: number[] = (this.selectedTargets ?? []).map(str => parseInt(str, 10));

    try {
      const result = await this.apiService.getPredictions(this.telescope, targetListInt, this.model, this.vision, false, "").toPromise();
      let newData = this.converterParaDicionarios(result, this.model, this.vision, this.telescope);
      newData.forEach(element => {
        this.ELEMENT_DATA.push(element);
      });

      this.toastr.success('Predição concluída com sucesso!', 'Sucesso', {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });

      this.telescope = "";
      this.target = new FormControl([]);

      this.targetsList = []

      this.canSee = true

    } catch (error) {
      console.error('Ocorreu um erro:', error);
      this.toastr.error('Ocorreu um erro ao processar a solicitação', 'Erro', {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
    }
  }

  dataSource = this.ELEMENT_DATA;

  public getModels() {
    let new_dict: any = {}
    this.apiService.getModels().subscribe(data => {
      for (const chave in data.list_models) {
        new_dict[chave] = data.list_models[chave];
      }
      this.modelsModel = new_dict;
    });
  }

  public onTelescopeChange(event: any) {
    if (this.vision && this.telescope) {
      this.toastr.info(`Carregando informações do telescópio ${this.telescope}`, 'Carregando...', {
        closeButton: true,
        timeOut: 2000,
        positionClass: 'toast-top-center'
      });

      this.apiService.getCandidates(this.telescope, this.vision).subscribe(data => {
        this.targetsList = data.list_targets_candidates;
        this.toastr.success('Dados carregados com sucesso!', 'Sucesso', {
          closeButton: true,
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      })
    }
  }

  public converterParaDicionarios(dados: any, model: string, vision: string, telescope: string): PeriodicElement[] {
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
        probabilidade: Math.round(probabilidade * 10000) / 100,
        image: image
      });
    }

    return lista;
  }

  public openDialogInfoModel(vision: string, model: string): void {
    this.toastr.info(`Carregando informação do modelo`, 'Carregando...', {
      closeButton: true,
      timeOut: 2000,
      positionClass: 'toast-top-center'
    });

    this.dialog.open(ModalShowModelInfoComponent, {
      width: '100%',
      data: {
        model: model,
        vision: vision
      }
    })

    this.toastr.success('Informações do modelo carregadas com sucesso!', 'Sucesso', {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-top-center'
    });
  }

  about() {
    this.dialog.open(ModalAboutSelectModelPageComponent, {
      width: '600px',
    })
  }
}
