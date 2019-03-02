import { Component, OnInit } from "@angular/core";

import { NavigationService } from "../../services/navigation/navigation.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private nav: NavigationService) {}

  ngOnInit() {}
}
