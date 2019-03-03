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

  createLab() {
    if (this.client.getLabId() !== '') return;
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
      this.client.setLabId(lab.id);
      this.client.setToken(lab.token);
      this.nav.admin();
    });
  }

  getClient() {
    return this.client;
  }
}
