import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<SelectSectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public ngOnInit(): void {
    this.getSectorTarget();
  }

  public getSectorTarget(): void {
    let observation = this.data.observation;
    console.log('observationnnn', observation);
    console.log("this.data.observation", this.data.observation);

    let telescope = this.data.telescope;

    this.apiService.getSectorTargets(observation, telescope).subscribe((data: any) => {
      this.idTargetList = Object.keys(data[Object.keys(data)[0]])
      console.log('data', data);
      this.result = data;
      console.log('idTargetList', this.idTargetList);
    });
  }

  public getIdSelectValue(): void {
    this.getRealSector(this.author);
    console.log('Valor do Id selecionado:', this.author);
  }

  public getTargetSelectValue(): void {
    console.log('Valor do target selecionado:', this.sector);
  }

  public getRealSector(valor: any): void {
    let data = this.result;

    this.finalSector = data[(Object.keys(data)[0])][valor]
  }

  public closeModal(): void {
    console.log('SelectedId', this.author);
    console.log('SelectedTarget', this.sector);

    const modalValue = {
      id_target: this.data.observation,
      sector: this.author,
      author_observation: this.sector
    }

    console.log('modalValue', modalValue);

    this.dialogRef.close(modalValue);
  }
}
