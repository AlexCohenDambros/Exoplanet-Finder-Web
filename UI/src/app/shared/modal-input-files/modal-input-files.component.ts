import { ApiService } from 'src/app/configuration/API/api.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-input-files',
  templateUrl: './modal-input-files.component.html',
  styleUrls: ['./modal-input-files.component.scss']
})
export class ModalInputFilesComponent {

  constructor(public apiService: ApiService, private toastr: ToastrService, public dialogRef: MatDialogRef<ModalInputFilesComponent>) { }

  vision = "Global"
  file: any

  visionModel = [
    { value: 1, name: 'Global' },
    { value: 2, name: 'Local' },
  ];

  selectFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    this.file = inputElement?.files?.[0];
  }

  public insert() {
    this.toastr.info(`Inserindo Modelo...`, 'Carregando...', {
      closeButton: true,
      timeOut: 2000,
      positionClass: 'toast-top-center'
    });

    if (this.file) {
      this.apiService.InsertModel(this.file, this.vision).subscribe()
      this.toastr.success('Modelo inserido com sucesso!', 'Sucesso', {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
      this.dialogRef.close()
    }
  }
}
