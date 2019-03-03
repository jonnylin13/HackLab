import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../../services/navigation/navigation.service';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private nav: NavigationService, private client: ClientService) {}

  getNav() {
    return this.nav;
  }

  ngOnInit() {}

  getClient() {
    return this.client;
  }
}
