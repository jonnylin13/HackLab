import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client/client.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { Evaluator } from '../../utils/evaluator.util';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  code: string = this.client.getLab() ? this.client.getLab().code : '';
  private evaluator = new Evaluator();
  constructor(private client: ClientService, private nav: NavigationService) {}

  ngOnInit() {
    if (this.client.getToken() === '') this.nav.home();
  }

  submit() {
    this.evaluator.evaluate(this.code).then(res => {
      if (res) this.client.submit();
    });
  }

  restart() {
    this.code = this.client.getLab().code;
  }

  disconnect() {
    this.client.disconnect().subscribe(res => {
      this.nav.home();
    });
  }

  getClient() {
    return this.client;
  }
}
