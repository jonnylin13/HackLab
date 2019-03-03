import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Lab } from '../../models/response';

const localUrl: string = 'http://localhost:8080/api/';
const externalUrl: string = 'https://hacklab.herokuapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string;
  labId: string = '';
  token: string = '';
  lab: any;

  constructor(private http: HttpClient) {
    this.url = externalUrl;
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

  joinLab(labId: string, nickname: string) {
    let payload = {
      nickname: nickname
    };
    return this.http.post(this.url + 'labs/' + labId, payload);
  }

  disconnect() {
    let payload = {
      token: this.token
    };
    let labId = this.labId;
    this.labId = '';
    this.token = '';
    this.lab = undefined;
    return this.http.post(this.url + 'disconnect/' + labId, payload);
  }

  submit() {
    let payload = {
      token: this.token
    };
    return this.http.post(this.url + 'submit/' + this.labId, payload);
  }

  setLabId(labId: string) {
    this.labId = labId;
  }

  getLabId() {
    return this.labId;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setLab(obj) {
    this.lab = obj;
  }

  getLab() {
    return this.lab;
  }

  toggleFullscreen() {
    let elem = document.documentElement;
    let isFullscreen =
      document['fullscreenElement'] ||
      document['webkitFullscreenElement'] ||
      document['mozFullscreenElement'] ||
      document['msFullscreenElement'];

    let requestFullscreen =
      elem.requestFullscreen ||
      elem['msRequestFullscreen'] ||
      elem['mozRequestFullscreen'] ||
      elem['webkitRequestFullscreen'];

    let exitFullscreen =
      document.exitFullscreen ||
      document['webkitExitFullscreen'] ||
      document['mozExitFullscreen'] ||
      document['webkitExitFullscreen'];

    if (isFullscreen) {
      if (exitFullscreen) exitFullscreen.call(document);
    } else {
      if (requestFullscreen) requestFullscreen.call(elem);
    }
  }
}
