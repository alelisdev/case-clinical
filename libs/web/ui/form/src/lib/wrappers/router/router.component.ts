import { DataContextService } from './../../context-provider/data-context.service';
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FieldWrapper } from '@ngx-formly/core'
import { UiFormBaseWrapper } from '../base-field-wrapper';

@Component({
  template: `
    <div>
      <a *ngIf="!to.isAbsoluteUrl" [routerLink]="[url]" class="cursor-pointer hover:no-underline">
        <ng-container #fieldComponent></ng-container>
      </a>
      <a *ngIf="to.isAbsoluteUrl" [href]="[url]" class="cursor-pointer hover:no-underline">
        <ng-container #fieldComponent></ng-container>
      </a>
    </div>
  `,
})
export class RouterComponent extends UiFormBaseWrapper implements OnInit, OnDestroy {
  subscriber;
  url = "#"

  ngOnInit(): void {
    super.ngOnInit();

    const _url = this.to.url as string;
    if(_url) {
      this.subscriber = this.service.parseStatementStream(_url).subscribe((url) => {
        this.url = url;
      })
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscriber?.unsubscribe();
  }
}
