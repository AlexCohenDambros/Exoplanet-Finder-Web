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

  getTargets(id: string, candidates: boolean): Observable<any> {
    const url = `${this.apiUrl}/getTargets`;
    return this.http.post(url, { id: id, candidates: candidates }, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }
  getCandidates(id: string, vision: string): Observable<any> {
    const url = `${this.apiUrl}/getCandidatesValid`;
    return this.http.post(url, { telescope: id, vision: vision }, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }

  public getSectorTargets(idTarget: string, telescope: string): Observable<any> {
    const url = `${this.apiUrl}/getSectorTargets`;
    return this.http.post(url, { id_target: idTarget, telescope: telescope }, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }

  public getModels(): Observable<any> {
    const url = `${this.apiUrl}/getModels`;
    return this.http.get(url, { headers: new HttpHeaders().append('Content-Type', 'application/json') });
  }

  InsertModel(arquivo: File, vision: string): Observable<any> {
    const url = `${this.apiUrl}/insertModel`;
    const formData = new FormData();
    formData.append('model', arquivo, arquivo.name);
    formData.append('vision', vision);
    return this.http.post(url, formData);
  }

  public getImagem(id: string, target: string): Observable<any> {
    const url = `${this.apiUrl}/generateGraph`;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };
    return this.http.post(url, { id, target }, options);
  }
  getPredictions(telescope: string, id_candidate: number[], model: string, vision: string, multiview: boolean, mode: string): Observable<any> {
    const url = `${this.apiUrl}/predictTargetCandidate`;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };
    return this.http.post(url, { name_telescope: telescope, id_candidate: id_candidate, model: model, vision: vision, multiview: multiview, mode: mode }, options)
  }
  getModelInfo(model: string, vision: string): Observable<any> {
    const url = `${this.apiUrl}/infoModel`;
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };
    return this.http.post(url, { model, vision }, options)
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
