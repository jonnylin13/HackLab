import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client/client.service';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  code: string = this.client.getLab().code;
  constructor(private client: ClientService, private nav: NavigationService) {}

  ngOnInit() {
    if (this.client.getToken() === '') this.nav.home();
  }

  submit() {
    console.log(this.client.getLab());
    console.log('implement submit!');
  }

  restart() {
    this.code = this.client.getLab().code;
  }

  disconnect() {
    console.log('implement disconnect!');
  }

  getClient() {
    return this.client;
  }
}
