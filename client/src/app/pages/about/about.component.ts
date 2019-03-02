import { Component, OnInit } from "@angular/core";

import { NavigationService } from "../../services/navigation/navigation.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  constructor(private nav: NavigationService) {}

  ngOnInit() {}
}
