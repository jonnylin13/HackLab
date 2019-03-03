import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../../services/navigation/navigation.service';
import { ClientService } from '../../services/client/client.service';
import { SocketService } from '../../services/socket/socket.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private client: ClientService,
    private nav: NavigationService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    if (this.client.getLabId() === '') {
      this.nav.home();
      return;
    }

    this.socketService.handshake();
  }

  getShortId() {
    if (!this.client.getLab()) {
      return 'Please be patient...';
    }
    return this.client.getLab()['id'];
  }

  getNumStudents() {
    if (!this.client.getLab()) {
      return 0;
    }
    return Object.keys(this.client.getLab()['students']).length;
  }

  getNumStudentsCompleted() {
    return 0;
  }
}
