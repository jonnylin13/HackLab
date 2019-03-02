import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  @Input() class: string;
  @Input() centered: boolean;

  constructor() {}

  ngOnInit() {
    if (this.class === undefined) this.class = "full-container";
    if (this.centered === undefined) this.centered = false;
  }
}
