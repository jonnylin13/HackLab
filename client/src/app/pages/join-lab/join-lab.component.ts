import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../../services/navigation/navigation.service';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'app-join-lab',
  templateUrl: './join-lab.component.html',
  styleUrls: ['./join-lab.component.scss']
})
export class JoinLabComponent implements OnInit {
  nickname: string = '';
  labId: string = '';
  constructor(private nav: NavigationService, private client: ClientService) {}

  ngOnInit() {}

  getNav() {
    return this.nav;
  }

  join() {
    this.client.joinLab(this.labId, this.nickname).subscribe(res => {
      console.log(res);
      if (res['code'] !== 1) {
        console.log('Rip :( Code: ' + res['code']);
        return;
      }

      this.client.setToken(res['token']);
      this.client.setLabId(this.labId);
      this.client.setLab(res['lab']);
      this.nav.student();
    });
  }
}
