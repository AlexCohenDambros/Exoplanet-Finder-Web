import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss']
})
export class ScatterPlotComponent {

  selecionarArquivo(event: any) {
    const arquivo = event.target.files[0];
    console.log('Arquivo selecionado:', arquivo);

    if (arquivo) {
      this.leDadosDoExcel(arquivo)
        .then(dados => {
          this.plotarGraficoDeDispersao(dados, 'colunaX', 'colunaY');
        })
        .catch(error => {
          console.error('Erro ao ler o arquivo:', error);
        });
    }
  }

  leDadosDoExcel(file: File): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });

        const header = Object.keys(jsonData[0]);
        const dataRows = jsonData.slice(1);
        const dados = dataRows.map(row => {
          const item: any = {};
          header.forEach((column, index) => {
            item[column] = row[index];
          });
          return item;
        });

        resolve(dados);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  plotarGraficoDeDispersao(dados: any[], xColumn: string, yColumn: string) {
    const canvas: HTMLCanvasElement = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const labels = dados.map(item => item[xColumn]);
      const data = dados.map(item => item[yColumn]);

      new Chart(ctx, {
        type: 'scatter',
        data: {
          labels: labels,
          datasets: [
            {
              label: yColumn,
              data: data,
              showLine: false,
              borderColor: 'rgba(0, 123, 255, 0.8)',
              backgroundColor: 'rgba(0, 123, 255, 0.8)',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    } else {
      console.error('Não foi possível obter o contexto do canvas.');
    }
  }
}
