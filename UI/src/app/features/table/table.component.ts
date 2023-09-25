import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/configuration/API/api.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

  constructor(private apiService: ApiService){}
  loadedBase = ''
  telescope = 'TESS';
  telescopeModel = [
    { value: 1, name: 'TESS' },
    { value: 2, name: 'K2' },
    { value: 3, name: 'KEPLER' },
  ];
  dataSource: any = [];
  public submitForms(): void {
    console.log(this.loadedBase)
    console.log(this.telescope)
    if(this.loadedBase!==this.telescope){
      this.dataSource=[]
      let base = this.apiService.getTelescopeData(this.telescope)
      base.subscribe(dados => {
        this.dataSource = dados
        console.log(dados)
      })
      this.loadedBase = this.telescope;
    }
  }
}
