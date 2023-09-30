import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/configuration/API/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService) { }

  loadedBase = ''
  telescope = 'TESS';

  telescopeModel = [
    { value: 1, name: 'TESS' },
    { value: 2, name: 'K2' },
    { value: 3, name: 'KEPLER' },
  ];

  dataSource: any = [];

  public submitForms(): void {
    if (this.loadedBase !== this.telescope) {
      this.dataSource = []
      let base = this.apiService.getTelescopeDataFiltered(this.telescope)
      base.subscribe(dados => {
        this.dataSource = dados
      })
      this.loadedBase = this.telescope;

      if (!base) {
        this.toastr.warning('Desculpe, ocorreu um erro. Por favor, tente novamente.', 'Erro', {
          closeButton: true,
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
      else {
        this.toastr.info(`Carregando informações do telescópio ${this.telescope}`, 'Carregando...', {
          closeButton: true,
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      }
    }
  }

  public downloadCsv(): void {
    const id = this.telescope;

    let result = this.apiService.getTelescopeCsv(id).subscribe((blobData: Blob) => {
      const blob = new Blob([blobData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.loadedBase}.csv`; // Nome do arquivo
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });

    if (!result) {
      this.toastr.warning('Desculpe, ocorreu um erro. Por favor, tente novamente.', 'Erro', {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
    }
    else {
      this.toastr.success('Download concluido com sucesso!', 'Sucesso', {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
    }
  }
}
