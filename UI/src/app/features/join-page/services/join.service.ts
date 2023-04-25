import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/domain/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class JoinService {

  apiUrl = 'https://localhost:7297/api/User';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UserModel[]>(this.apiUrl);
  }

}
