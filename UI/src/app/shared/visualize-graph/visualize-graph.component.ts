import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualize-graph',
  templateUrl: './visualize-graph.component.html',
  styleUrls: ['./visualize-graph.component.scss']
})
export class VisualizeGraphComponent implements OnInit {
  @Input() graphData: any;

  image_path_1: string = '';
  image_path_2: string = '';
  image_path_data: string = '';

  ngOnInit(): void {
    if (this.graphData) {
      this.image_path_1 = `data:image/png;base64,${this.graphData.image1_base64}`;
      this.image_path_2 = `data:image/png;base64,${this.graphData.image2_base64}`;
      this.image_path_data = `data:image/png;base64,${this.graphData.data_base64}`;
    }
  }

}
