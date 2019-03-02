import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private nav: NavigationService) {}

  ngOnInit() {}

  getNav() {
    return this.nav;
  }
}
