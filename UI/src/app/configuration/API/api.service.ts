import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  public getTelescopeDataFiltered(id: string): Observable<Blob> {
    const url = `${this.apiUrl}/getDataTelescope`;
    return this.http.post(url, { id: id }, { responseType: 'blob' }).pipe(switchMap(blobData => this.blobToListOfLists(blobData)));
  }

  public getTelescopeCsv(id: string): Observable<Blob> {
    const url = `${this.apiUrl}/getDataTelescope`;
    return this.http.post(url, { id: id }, { responseType: 'blob' });
  }

  public getTargets(selectedTelescope: string, isCheckboxChecked: boolean): Observable<any> {
    const url = `${this.apiUrl}/getTargets`;
    return this.http.post(url, { id: selectedTelescope, candidates: isCheckboxChecked }, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }

  public getSectorTargets(idTarget: string, telescope: string): Observable<any> {
    const url = `${this.apiUrl}/getSectorTargets`;
    return this.http.post(url, { id_target: idTarget, telescope: telescope }, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }

  public getModels(): Observable<any> {
    const url = `${this.apiUrl}/getModels`;
    return this.http.get(url, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }

  public InsertModel(arquivo: File): Observable<any> {
    const url = `${this.apiUrl}/insertModel`;
    const formData = new FormData();
    formData.append('arquivo', arquivo, arquivo.name);
    return this.http.post(url, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }

  public getImagem(id: string, target: string): Observable<any> {
    const url = `${this.apiUrl}/generateGraph`;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };
    return this.http.post(url, { id, target }, options);
  }

  public getObservationAnalysis(model: string, vision: string, telescope: string, targets: any): any {
    return { teste: "corno" }
  }

  public generateGraph(id: string, sector: string, author: string, telescope: string): Observable<any> {
    const url = `${this.apiUrl}/generateGraph`;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };
    return this.http.post(url, { id, sector, author, telescope }, options);
  }


  private blobToListOfLists(blobData: Blob, maxRows: number = 400): Observable<any> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const csvData = reader.result as string;
        const rows = csvData.split('\n');
        const listOfLists = [];

        for (let i = 0; i <= maxRows; i++) {
          const columns = rows[i].split(',');
          listOfLists.push(columns);
        }

        observer.next(listOfLists);
        observer.complete();
      };

      reader.readAsText(blobData);
    });
  }
}
