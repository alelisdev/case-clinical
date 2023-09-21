import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'ui-code-editor',
  template: `<div style='height: 500px'>
    <ngx-monaco-editor style='height: 100%;' [options]="editorOptions" [(ngModel)]="code"></ngx-monaco-editor>
  </div>`,
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit, OnDestroy {
  @Input() code: string;
  @Output() codeDidChange = new EventEmitter();

  prevCode = ''

  editorOptions = {theme: 'vs-dark', language: 'typescript'};

  ngOnInit(): void {
    this.prevCode = this.code;
    setInterval(() => {
      if(this.prevCode !== this.code) {
        this.codeDidChange.emit(this.code);
        this.prevCode = this.code;
      }
    }, 1000)
  }

  ngOnDestroy(): void {
    this.codeDidChange.emit(this.code)
  }
}

