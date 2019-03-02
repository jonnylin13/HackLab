import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Lab } from '../../models/lab';

const localUrl: string = 'http://localhost:8080/api/';
const externalUrl: string = 'https://hacklab.herokuapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string;
  lobbyId: string = '';

  constructor(private http: HttpClient) {
    this.url = localUrl;
  }

  ping() {
    return this.http.get(this.url);
  }

  createLab(code: string, nickname: string): Observable<Lab> {
    let payload = {
      code: code,
      nickname: nickname
    };
    return this.http.post<Lab>(this.url + 'labs', payload);
  }

  setLobbyId(lobbyId: string) {
    this.lobbyId = lobbyId;
  }

  getLobbyId() {
    return this.lobbyId;
  }
}
