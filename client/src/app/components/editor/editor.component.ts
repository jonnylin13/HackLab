import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true,
    tabSize: 2
  };
  @Input() code: string = '';
  @Output() codeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  change() {
    this.codeChange.emit(this.code);
  }
}
