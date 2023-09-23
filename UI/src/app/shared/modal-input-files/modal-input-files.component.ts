import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-input-files',
  templateUrl: './modal-input-files.component.html',
  styleUrls: ['./modal-input-files.component.scss']
})
export class ModalInputFilesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectFile() {
    console.log('Arquivo selecionado');
  }
}
