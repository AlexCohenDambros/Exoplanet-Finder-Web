import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  getTelescopeDataFiltered(id: string): Observable<Blob> {
    const url = `${this.apiUrl}/getDataTelescope`;
    return this.http.post(url, { id: id }, { responseType: 'blob' }).pipe(switchMap(blobData => this.blobToListOfLists(blobData)));
  }

  getTelescopeCsv(id: string): Observable<Blob> {
    const url = `${this.apiUrl}/getDataTelescope`;
    return this.http.post(url, { id: id }, { responseType: 'blob' });
  }

  getTargets(id: string): Observable<any> {
    const url = `${this.apiUrl}/getTargets`;
    return this.http.post(url, { id: id }, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }

  getModels(): Observable<any> {
    const url = `${this.apiUrl}/getModels`;
    return this.http.get(url, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }

  InsertModel(arquivo: File): Observable<any> {
    const url = `${this.apiUrl}/insertModel`;
    const formData = new FormData();
    formData.append('arquivo', arquivo, arquivo.name);
    return this.http.post(url, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }

  getImagem(id: string, target: string): Observable<any> {
    const url = `${this.apiUrl}/generateGraph`;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };
    return this.http.post(url, { id, target }, options);
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
