import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { Observable, Subject, takeUntil } from 'rxjs';
import { UiFormBaseField } from '../../types/base-field-type';

@Component({
  template: `
  <div class="w-full h-full">
    <div *ngIf="manualArrangement" class="flex flex-col overflow-hidden" [style]="Style" [ngClass]="innerClass">
        <formly-field [field]="chiledField" *ngFor="let chiledField of field.fieldGroup"></formly-field>
    </div>

    <div *ngIf="to.showNoDataLabel && ((manualArrangement && field.fieldGroup?.length === 0) || (!manualArrangement && (field.fieldGroup?.length === 0 || verticalItems?.length === 0)))" class="text-center w-full text-red-700 font-medium">There is no data to display</div>

    <div *ngIf="!manualArrangement && field.fieldGroup?.length > 0 && verticalItems?.length > 0;" class="flex flex-col overflow-hidden" [ngClass]="innerClass" [style]="Style">
      <ui-context-provider class="flex w-full" [data]="datum" *ngFor="let datum of verticalItems; let i = index;">
        <formly-field [field]="verticalItemField">
        </formly-field>
      </ui-context-provider>
    </div>
  </div>
  `,
})
export class UiFormColComponent extends UiFormBaseField implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  manualArrangement = false;

  dynamicStyle = "";
  verticalItemField: FormlyFieldConfig;
  verticalItems = [];
  clonedFields = [];

  style = "";
  innerClass = "";
  outerClass = "";
  dataKey;

  ngOnInit(): void {
    super.ngOnInit();

    this.dataKey = this.to.dataKey;
    if (this.dataKey) {
      if(this.field.fieldGroup.length > 0) {
        this.verticalItemField = this.field.fieldGroup[0];
      }
      const source = this.service.getValue(this.dataKey);
      if(source instanceof Observable) {
        source.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
          console.log('need to refresh vertical wrapper');
          this.verticalItems = data ?? [];
        })
      } else {
        this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if(_data) {
            const data = this.formService.getValueForKey(this.dataKey, _data);
            this.verticalItems = data ?? [];
          }
        })
      }
    } else {
      this.manualArrangement = true;
    }

    const className = this.to.className;
    const { innerClass, outerClass } = this.tailwindService.splitClassName(className);
    this.innerClass = innerClass;
    if(this.to.divider ?? false) {
      this.innerClass += ' divide-y divide-gray-300';
    }

    if(this.innerClass?.includes("justify"))
      this.innerClass += " h-full";
    this.outerClass = outerClass;

    this.field.className = this.outerClass;

    this.style = this.to.backgroundImage && this.to.backgroundImage.image ? `background: linear-gradient( 0deg,rgba(0,0,0, ${this.to.backgroundImage.opacity ?? 0}),rgba(0,0,0, ${this.to.backgroundImage.opacity ?? 0}) ),url(${this.service.parseStatement(this.to.backgroundImage.image)}) ${this.to.backgroundImage.position ?? 'center'}/${this.to.backgroundImage.size ?? 'cover'}; background-repeat: none;` : ""
  }

  public get Style() : string {
    return `${this.style} ${this.dynamicStyle}`;
  }


  dynamicStyleChanged(style: string) {
    this.dynamicStyle = style;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }
}
