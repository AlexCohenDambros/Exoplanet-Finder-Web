import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visualize-graph',
  templateUrl: './visualize-graph.component.html',
  styleUrls: ['./visualize-graph.component.scss']
})

export class VisualizeGraphComponent implements OnInit {
  @Input() graphData: any;

  constructor(public toastr: ToastrService) { }

  image_path_1: string = '';
  image_path_2: string = '';

  ngOnInit(): void {

    if (this.graphData) {
      this.image_path_1 = `data:image/png;base64,${this.graphData.image1_base64}`;
      this.image_path_2 = `data:image/png;base64,${this.graphData.image2_base64}`;

      this.toastr.success('Gráfico gerado com sucesso!', 'Sucesso', {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
    }
    else {
      this.toastr.warning('Desculpe, Não foi possível gerar o gráfico. Por favor, tente novamente.', 'Erro', {
        closeButton: true,
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
    }
  }
}
