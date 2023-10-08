import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectModelsComponent } from 'src/app/features/select-models/select-models.component';

@Component({
  selector: 'app-modal-show-graph',
  templateUrl: './modal-show-graph.component.html',
  styleUrls: ['./modal-show-graph.component.scss']
})

export class ModalShowGraphComponent {

  constructor(
    public dialogRef: MatDialogRef<SelectModelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  image_path: string = `data:image/png;base64,${this.data.image}`;
}
