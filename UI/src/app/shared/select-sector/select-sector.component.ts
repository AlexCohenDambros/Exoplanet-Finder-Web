import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/configuration/API/api.service';

@Component({
  selector: 'app-select-sector',
  templateUrl: './select-sector.component.html',
  styleUrls: ['./select-sector.component.scss']
})

export class SelectSectorComponent implements OnInit {

  toppingsFormControl = new FormControl();
  sectorTargets: any[] = [];
  idTargetList: any[] = [];
  author: any;
  sector: any;
  result: any;
  finalSector: any[] = [];
  valorSelecionadoId: any;
  valorSelecionadoSetor: any;

  constructor(
    public apiService: ApiService,
    public toastr: ToastrService,
    public dialogRef: MatDialogRef<SelectSectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public ngOnInit(): void {
    this.getSectorTarget();
  }

  public getSectorTarget(): void {
    let observation = this.data.observation;

    let telescope = this.data.telescope;

    this.apiService.getSectorTargets(observation, telescope).subscribe((data: any) => {
      this.idTargetList = Object.keys(data[Object.keys(data)[0]])

      this.result = data;
    });
  }

  public getIdSelectValue(): void {
    this.getRealSector(this.author);
  }

  public getTargetSelectValue(): void {
    console.log('Valor do target selecionado:', this.sector);
  }

  public getRealSector(valor: any): void {
    let data = this.result;

    this.finalSector = data[(Object.keys(data)[0])][valor]
  }

  public closeModal(): void {

    const modalValue = {
      id_target: this.data.observation,
      sector: this.author,
      author_observation: this.sector
    }

    if (modalValue.id_target === undefined || modalValue.sector === undefined || modalValue.author_observation === undefined) {
      this.toastr.warning('Aconteceu um erro inesperado, tente novamente!', 'Erro', {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
    }
    else {
      this.toastr.info('Carregando informações!', 'Carregando', {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });

      setTimeout(() => {
        this.toastr.success('Observação selecionada com sucesso!', 'Sucesso', {
          closeButton: true,
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }, 3000);

      this.dialogRef.close(modalValue);
    }
  }
}
