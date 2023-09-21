import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { Observable, Subject } from 'rxjs'
import { UiFormBaseField } from '../../types/base-field-type';
import { cloneDeep } from 'lodash';
@Component({
  template: `
    <ng-container *ngIf="manualArrangement">
      <div *ngIf="field.fieldGroup.length > 0" [style]="style" class='' [ngClass]="innerClass">
        <formly-field [field]="chiledField" *ngFor="let chiledField of field.fieldGroup" class="flex"></formly-field>
      </div>
    </ng-container>

    <div *ngIf="to.showNoDataLabel && ((manualArrangement && field.fieldGroup?.length === 0) || (!manualArrangement && (field.fieldGroup?.length === 0 || gridItems?.length === 0)))" class="text-center w-full text-red-700 font-medium">There is no data to display</div>

    <ng-container *ngIf="!manualArrangement">
      <div *ngIf="field.fieldGroup?.length > 0 && gridItems?.length > 0;" class='' [style]="style" [ngClass]="innerClass">
        <ui-context-provider class="flex" [data]="datum" *ngFor="let datum of gridItems; let i = index;">
          <formly-field [field]="clonedFields[i]"></formly-field>
        </ui-context-provider>
      </div>
    </ng-container>
  `,
})
export class UiFormGridContainerComponent extends UiFormBaseField implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  value = ''
  manualArrangement = false;
  gridItems = []
  open = false;

  // className = "";
  gridItemField: FormlyFieldConfig;

  clonedFields = [];
  style = "";
  innerClass = "";
  outerClass = "";

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    super.ngOnInit();

    const dataKey = this.to.dataKey;
    if (dataKey) {
      if(this.field.fieldGroup.length > 0) {
        this.gridItemField = this.field.fieldGroup[0];
      }
      const source = this.service.getValue(dataKey);
      if(source instanceof Observable) {
        source.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
          const tempGrid = this.gridItems;
            if( tempGrid?.length < data?.length ) {
              this.clonedFields = data.map(() => {
                return cloneDeep(this.gridItemField)
              });
            }
            this.gridItems = data? data: [];
        })
      } else {
        this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if(_data) {
            const data = this.formService.getValueForKey(dataKey, _data);
            const tempGrid = this.gridItems;
            if( tempGrid?.length < data?.length ) {
              this.clonedFields = data.map(() => {
                return cloneDeep(this.gridItemField)
              });
            }
            this.gridItems = data? data: [];
          }
        })
      }
    } else {
      this.manualArrangement = true;
    }

    const className = this.field.className;
    const { innerClass, outerClass } = this.tailwindService.splitClassName(className);
    this.innerClass = innerClass;
    this.innerClass += ` grid grid-cols-1 sm:grid-cols-${this.to.count ?? 2} md:grid-cols-${this.to.mdCount ?? 3} lg:grid-cols-${this.to.lgCount ?? 3} xl:grid-cols-${this.to.xlCount ?? 4}`;
    this.outerClass = outerClass;

    this.field.className = this.outerClass;
    this.style = `
       gap: ${this.to.gap ?? 10}px;
    `;
    this.style += this.to.backgroundImage && this.to.backgroundImage.image ? `background: linear-gradient( 0deg,rgba(0,0,0, ${this.to.backgroundImage.opacity ?? 0}),rgba(0,0,0, ${this.to.backgroundImage.opacity ?? 0}) ),url(${this.service.parseStatement(this.to.backgroundImage.image)}) ${this.to.backgroundImage.position ?? 'center'}/${this.to.backgroundImage.size ?? 'cover'}; background-repeat: none;` : ""
  }
}
