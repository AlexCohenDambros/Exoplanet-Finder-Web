import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss']
})
export class ScatterPlotComponent {

  removeFileSelector: boolean = false;

  selectFile(event: any) {
    const file = event.target.files[0];
    console.log('Arquivo selecionado:', file);

    if (file) {
      this.readExcel(file)
        .then(data => {
          this.plotScatterplot(data, 'flux', 'flux_err');
        })
        .catch(error => {
          console.error('Error reading file:', error);
        });
    }
  }

  readExcel(file: File): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const data = e.target.result;
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (extension === 'xlsx') {
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const header: string[] = Object.keys(jsonData[0] as object);
          const dataRows = jsonData.slice(1) as any[][];
          const dados = dataRows.map((row: any[]) => {
            const item: any = {};
            header.forEach((column: string, index: number) => {
              item[column] = row[index];
            });

            return item;
          });
          resolve(dados);

        } else if (extension === 'csv') {
          const lines = data.split('\n');
          const header = lines[0].split(',');
          const dataRows = lines.slice(1) as string[];
          const dados = dataRows.map((row: string) => {
            const values = row.split(',');
            const item: any = {};
            header.forEach((column: string, index: number) => {
              item[column] = values[index];
            });
            return item;
          });

          resolve(dados);
        } else {
          reject('Unsupported file type.');
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  }

  plotScatterplot(dados: any[], xColumn: string, yColumn: string) {
    this.removeFileSelector = true;

    const canvas: HTMLCanvasElement = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const labels = dados.map(item => item[xColumn]);
      const data = dados.map(item => item[yColumn]);
      const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
          labels: labels,
          datasets: [
            {
              label: xColumn,
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
          animation: {
            duration: 1000,
            easing: 'easeOutQuart',
          },
        },
      });

      // Função para manipular o evento de scroll do mouse
      function handleMouseWheel(event: WheelEvent) {
        const zoomFactor = 0.1; // Fator de zoom

        // Verifica se a tecla Ctrl ou Command está pressionada
        const isCtrlOrCmdPressed = event.ctrlKey || event.metaKey;

        if (isCtrlOrCmdPressed) {
          event.preventDefault();

          // Obtém as coordenadas do mouse no canvas
          const rect = canvas.getBoundingClientRect();
          const offsetX = event.clientX - rect.left;
          const offsetY = event.clientY - rect.top;

          // Calcula o fator de escala
          const scale = event.deltaY < 0 ? 1 + zoomFactor : 1 - zoomFactor;

          // Obtém os limites do gráfico
          const { left, top, width, height } = chart.chartArea;

          // Calcula as coordenadas do mouse em relação aos dados
          const xData = chart.scales['x'].getValueForPixel(offsetX);
          const yData = chart.scales['y'].getValueForPixel(offsetY);

          // Verifica se xData e yData estão definidos
          if (xData !== undefined && yData !== undefined) {
            // Calcula os novos limites do gráfico
            const newWidth = width * scale;
            const newHeight = height * scale;
            const newLeft = xData - (xData - left) * scale;
            const newTop = yData - (yData - top) * scale;

            // Define os novos limites do gráfico
            chart.chartArea.left = newLeft;
            chart.chartArea.top = newTop;
            chart.chartArea.right = newLeft + newWidth;
            chart.chartArea.bottom = newTop + newHeight;

            // Atualiza o gráfico
            chart.update();
          }
        }
      }

      // Adiciona o evento de scroll do mouse ao canvas
      canvas.addEventListener('wheel', handleMouseWheel);

    } else {
      console.error('Could not get canvas context.');
    }
  }
}
