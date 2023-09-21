import { Component, OnDestroy, OnInit } from '@angular/core'
import { UiFormBaseWrapper } from '../base-field-wrapper';

@Component({
  template: `
    <ui-context-provider *ngIf="useData && data" class="flex" [data]="data">
      <ng-template class='w-full' #fieldComponent></ng-template>
    </ui-context-provider>
    <ng-template *ngIf="!useData" #fieldComponent></ng-template>
  `,
  styleUrls: ['./style.css']
})
export class UiContextProviderComponent extends UiFormBaseWrapper implements OnInit, OnDestroy {
  private subscriber;
  useData = false;
  data = {}
  currentData;
  ngOnInit(): void {
    super.ngOnInit();
    const dataFeedMode = this.to.dataFeedMode;
    switch (dataFeedMode) {
      case 0:
        break;
      case 1:
        {
          const key = this.to.datakey;
          console.log({ key })
          if (key) {
            this.useData = true;
            this.subscriber = this.service.getDataStream().subscribe(_data => {
              this.currentData = _data
              this.data = this.service.getValue(key);
            })
          }
          break;
        }
      case 2:
        {
          this.useData = true;
          this.data = this.to.data ?? {};
          break;
        }
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscriber?.unsubscribe();
  }
}
