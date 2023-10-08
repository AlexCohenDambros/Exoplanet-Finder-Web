import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/configuration/API/api.service';
import { SelectSectorComponent } from 'src/app/shared/select-sector/select-sector.component';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})

export class GraphPageComponent {
  @Input() data: any;

  loadedBase = '';
  dataSource: any = { list_targets: [] };
  searchValue: string = '';
  originalList: string[] = [];
  seeFilter: boolean = true;
  selectedTelescope!: string;
  isCheckboxChecked: boolean = false;
  graphData: any;


  telescopeModel = [
    { value: 1, name: 'TESS' },
    { value: 3, name: 'Kepler' },
  ]

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  public onButtonClick() {
    if (this.loadedBase !== this.selectedTelescope) {
      if (this.selectedTelescope !== undefined) {

        this.dataSource.list_targets = [];
        let base = this.apiService.getTargets(this.selectedTelescope, this.isCheckboxChecked)
        base.subscribe(dados => {
          this.originalList = dados.list_targets;
          this.dataSource.list_targets = [...this.originalList];
          this.loadedBase = this.selectedTelescope;
          this.seeFilter = false;
        })

        if (!base) {
          this.toastr.warning('Desculpe, ocorreu um erro. Por favor, tente novamente.', 'Erro', {
            closeButton: true,
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
        }

        if (this.selectedTelescope !== undefined && base) {
          this.toastr.info(`Carregando informações do telescópio ${this.selectedTelescope}`, 'Carregando...', {
            closeButton: true,
            timeOut: 2000,
            positionClass: 'toast-top-center'
          });
        }
      }
      if (this.selectedTelescope == undefined) {
        this.toastr.warning('Por favor, selecione um telescópio.', 'Erro', {
          closeButton: true,
          timeOut: 3000,
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

  public openDialog(item: any): void {

    let telescope = this.selectedTelescope;
    let observation = item;

    const dialogRef = this.dialog.open(SelectSectorComponent, {
      width: '450px',
      data: {
        observation,
        telescope
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        this.toastr.warning('Por favor, selecione um setor.', 'Atenção', {
          closeButton: true,
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }

      let id = result.id_target;
      let sector = result.sector;
      let author = result.author_observation;
      let telescope = this.selectedTelescope;

      this.apiService.generateGraph(id, sector, author, telescope).subscribe((data: any) => {
        this.graphData = data;
      });
    });
  }

  public onSelectChange(event: any) {
    this.selectedTelescope = event.value;
  }

  public onCheckboxChange(event: any) {
    this.isCheckboxChecked = event.checked;
  }

  private resetList(): void {
    this.dataSource.list_targets = [...this.originalList];
  }
}
