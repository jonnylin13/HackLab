import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"]
})
export class LogoComponent implements OnInit {
  @Input() color: string;

  constructor() {}

  ngOnInit() {
    if (this.color === undefined) this.color = "black";
  }
}
