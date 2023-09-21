import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { DialogService } from '@ngneat/dialog';

import 'prismjs'

import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-typescript'

export type UiCodeLanguage = 'html' | 'graphql' | 'javascript' | 'json' | 'markdown' | 'typescript'

@Component({
  selector: 'ui-code',
  styles: [
    `
      ::ng-deep code {
        background-color: white;
        border-radius: 5px;
        padding: 10px;
      }
    `
  ],
  template: `
    <div class="relative">
      <ngx-numbered-codeblock
        *ngIf="!editOnly && !isEditing"
        [code]="Code"
        [languague]="language"
        [lineNumbers]="false"
      ></ngx-numbered-codeblock>
      <ui-code-editor
        *ngIf="editOnly || isEditing"
        [code]="code"
        (codeDidChange)="this.code=$event;codeDidChange.emit($event)"
      ></ui-code-editor>


      <button type='button' class="absolute p-2 right-1 top-1 rounded-full" [ngClass]="{'bg-gray-800': !isEditing, 'bg-gray-50': isEditing}" (click)="toggle()">
        <svg *ngIf="!isEditing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" class="w-4 h-4 text-white">
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>

        <svg *ngIf="isEditing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" class="w-4 h-4 text-white">
          <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
          <path fill-rule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zM12 10.5a.75.75 0 01.75.75v4.94l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72v-4.94a.75.75 0 01.75-.75z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <ng-template #editTp>
      <ui-code-editor
      [code]="code"
      (codeDidChange)="code=$event;codeDidChange.emit($event)"
    ></ui-code-editor>
      </ng-template>
  `,
})
export class WebUiCodeComponent {
  @Input() code = null;
  @Input() narrow = false;
  @Input() copyButton = true
  @Input() language: UiCodeLanguage = 'typescript'
  @Input() editOnly = false;
  @Output() codeDidChange = new EventEmitter();

  @ViewChild("editTp") editTp: TemplateRef<any>;
  isEditing = false;

  constructor(private readonly toast: WebUiToastService, public readonly dialog: DialogService,) {}

  public get Code() : string {
    return (!this.code || this.code.length === 0) ? 'Tap edit button to edit...' : this.code;
  }

  toggle() {
    console.log({ narrow: this.narrow })
    if(!this.narrow) {
      this.isEditing = !this.isEditing;
    } else {
      this.openEditDialog();
    }
  }

  copyDone(done: boolean) {
    if (done) {
      this.toast.success(`Copied to clipboard`, { duration: 3000 })
    } else {
      this.toast.error(`Error copying code to clipboard`)
    }
  }

  openEditDialog() {
    this.dialog.open(this.editTp, { minHeight: '200px', width: '70%' })
  }
}
