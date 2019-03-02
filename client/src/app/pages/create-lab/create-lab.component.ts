import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../../services/navigation/navigation.service';
import { ClientService } from '../../services/client/client.service';
import { Evaluator } from '../../utils/evaluator.util';

@Component({
  selector: 'app-create-lab',
  templateUrl: './create-lab.component.html',
  styleUrls: ['./create-lab.component.scss']
})
export class CreateLabComponent implements OnInit {
  private evaluator: Evaluator;
  code: string;
  nickname: string = '';
  createLabModal: boolean = false;
  constructor(private nav: NavigationService, private client: ClientService) {
    this.evaluator = new Evaluator();
  }

  getEvaluator() {
    return this.evaluator;
  }

  ngOnInit() {
    this.restart();
  }

  restart() {
    this.code = this.evaluator.getJS();
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

  createLab() {
    if (this.client.getLobbyId() !== '') return;
    this.createLabModal = true;
  }

  cancelCreateLab() {
    this.createLabModal = false;
  }

  confirmCreateLab() {
    if (this.nickname === '') {
      this.createLabModal = false;
      return;
    }
    let fmtCode = this.evaluator.format(this.code);
    this.client.createLab(fmtCode, this.nickname).subscribe(lab => {
      this.client.setLobbyId(lab.id);
      console.log(lab.id);
    });
  }
}
