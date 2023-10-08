import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/configuration/API/api.service';
import { SelectModelsComponent } from 'src/app/features/select-models/select-models.component';


@Component({
  selector: 'app-modal-show-model-info',
  templateUrl: './modal-show-model-info.component.html',
  styleUrls: ['./modal-show-model-info.component.scss']
})
export class ModalShowModelInfoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<SelectModelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public apiService: ApiService) { }
  dataInfo: { chave: string, valor: string }[] = [];
  VisionModel:string=this.data.vision;
  ModelName:string=this.data.model;



  metrics: any = {}
  confusionMatrix: any=""

  ngOnInit(): void {
    this.apiService.getModelInfo(this.data.model, this.data.vision).subscribe(res => {
      this.metrics = res.metrics
      this.confusionMatrix = `data:image/png;base64,${res.confusion_matrix_base64}`;
      Object.keys(this.metrics).forEach(key => {
        let chave: string = key;
        let valor: string = chave==="auc"? `${Math.round(this.metrics[key][0]*10000)/100}%`:`${Math.round(this.metrics[key][0]*100)/100}%`
        this.dataInfo.push({ chave, valor });
      })
      });

  }

}
