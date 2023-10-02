import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/configuration/API/api.service';
import { SelectSectorComponent } from 'src/app/shared/select-sector/select-sector.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})

export class GraphPageComponent {

  loadedBase = '';
  dataSource: any = { list_targets: [] };
  searchValue: string = '';
  originalList: string[] = [];
  seeFilter: boolean = true;


  telescopeModel = [
    { value: 1, name: 'TESS' },
    { value: 2, name: 'K2' },
    { value: 3, name: 'Kepler' },
  ]

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) { }

  public onSelectChange(event: any): void {
    const selectedName = event.value;

    if (this.loadedBase !== selectedName) {
      this.dataSource.list_targets = [];
      let base = this.apiService.getTargets(selectedName)
      base.subscribe(dados => {
        this.originalList = dados.list_targets;
        this.dataSource.list_targets = [...this.originalList];
        this.loadedBase = selectedName;
        this.seeFilter = false;
      })

      if (!base) {
        this.toastr.warning('Desculpe, ocorreu um erro. Por favor, tente novamente.', 'Erro', {
          closeButton: true,
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
      else {
        this.toastr.info(`Carregando informações do telescópio ${selectedName}`, 'Carregando...', {
          closeButton: true,
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      }
    }
  }

  public clearInput(): void {
    this.searchValue = '';
    this.filterList();
  }

  public filterList(): void {
    if (this.searchValue) {
      this.dataSource.list_targets = this.originalList.filter(
        (item: string) => item.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else {
      this.resetList();
    }
  }

  public openBottomSheet(item: any): void {
    console.log("item", item);

    const dialogRef = this.dialog.open(SelectSectorComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });


  }

  private resetList(): void {
    this.dataSource.list_targets = [...this.originalList];
  }
}
