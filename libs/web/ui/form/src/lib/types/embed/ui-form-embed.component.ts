import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  template: `
    <div class='bg-card w-full h-full'>
      <iframe target="_parent" *ngIf="to.url" width="100%" height="100%" frameBorder="0" [src]="safeUrl"></iframe>
      <div *ngIf="to.html" [innerHTML]="safeHtml"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class UiFormEmbedComponent extends FieldType implements OnInit {
  formControl!: FormControl

  safeUrl: SafeResourceUrl
  safeHtml: SafeResourceUrl

  constructor(public sanitizer: DomSanitizer) {
    super()
  }

  ngOnInit(): void {
    if(this.to.url) {
      this.safeUrl= this.sanitizer.bypassSecurityTrustResourceUrl(this.to.url);
    }
    if(this.to.html) {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.to.html)
    }
  }
}
