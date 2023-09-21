import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { Observable, Subject, takeUntil } from 'rxjs';
import { UiFormBaseField } from '../../types/base-field-type';

@Component({
  template: `
  <div class="w-full h-full">
    <div *ngIf="manualArrangement" class="flex flex-row" [style]="style" [ngClass]="innerClass">
      <formly-field [field]="chiledField" *ngFor="let chiledField of field.fieldGroup"></formly-field>
    </div>
    <div *ngIf="(manualArrangement && field.fieldGroup?.length === 0) || (!manualArrangement && (field.fieldGroup?.length === 0 || horizontalItems?.length === 0)) && to.showNoDataLabel" class="w-full py-3 text-center">There is no data to display</div>
    <div *ngIf="!manualArrangement && field.fieldGroup?.length > 0 && horizontalItems?.length > 0;" class="flex flex-row" [style]="style"  [ngClass]="innerClass">
      <ui-context-provider class="flex" [data]="datum" *ngFor="let datum of horizontalItems;let i = index;">
        <formly-field [field]="horizontalItemField"></formly-field>
      </ui-context-provider>
    </div>
  </div>
  `,
})
export class UiFormTableRowComponent extends UiFormBaseField implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  manualArrangement = false;

  horizontalItemField: FormlyFieldConfig;
  horizontalItems = []

  style = "";
  innerClass = "";
  outerClass = "";

  ngOnInit(): void {
    super.ngOnInit();

    const dataKey = this.to.dataKey;
    if (dataKey) {
      if(this.field.fieldGroup.length > 0) {
        this.horizontalItemField = this.field.fieldGroup[0];
      }
      const source = this.service.getValue(dataKey);
      if(source instanceof Observable) {
        source.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
          this.horizontalItems = data
        })
      } else {
        this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if(_data) {
            const data = this.formService.getValueForKey(dataKey, _data);
            this.horizontalItems = data;
          }
        })
      }
    } else {
      this.manualArrangement = true;
    }

    const className = this.to.className;
    const { innerClass, outerClass } = this.tailwindService.splitClassName(className);
    this.innerClass = innerClass;
    this.outerClass = outerClass;

    this.field.className = this.outerClass;

    this.style = this.to.backgroundImage && this.to.backgroundImage.image ? `background: linear-gradient( 0deg,rgba(0,0,0, ${this.to.backgroundImage.opacity ?? 0}),rgba(0,0,0, ${this.to.backgroundImage.opacity ?? 0}) ),url(${this.service.parseStatement(this.to.backgroundImage.image)}) ${this.to.backgroundImage.position ?? 'center'}/${this.to.backgroundImage.size ?? 'cover'}; background-repeat: none;` : ""
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }
}
