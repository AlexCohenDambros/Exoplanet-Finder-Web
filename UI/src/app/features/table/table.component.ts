import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/configuration/API/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  loadedBase = ''
  telescope = 'TESS';

  telescopeModel = [
    { value: 1, name: 'TESS' },
    { value: 2, name: 'K2' },
    { value: 3, name: 'KEPLER' },
  ];

  dataSource: any = [];

  ngOnInit(): void {
    let x = this.apiService.getTelescopeCsv("TESS");

    x.subscribe(dados => {
      console.log('aaa', dados)
    })
  }

  public submitForms(): void {
    if (this.loadedBase !== this.telescope) {
      this.dataSource = []
      let base = this.apiService.getTelescopeDataFiltered(this.telescope)
      base.subscribe(dados => {
        this.dataSource = dados
      })
      this.loadedBase = this.telescope;
    }
  }

  public downloadCsv(): void {
    const id = this.telescope;

    this.apiService.getTelescopeCsv(id).subscribe((blobData: Blob) => {
      const blob = new Blob([blobData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chupa_eu_gabu.csv'; // Nome do arquivo
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

}
