import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { Observable, Subject, takeUntil } from 'rxjs';
import { UiFormBaseField } from '../../types/base-field-type';

@Component({
  template: `
  <!-- <div class="w-full h-full">
    <div *ngIf="manualArrangement" class="flex flex-row" [style]="style" [ngClass]="innerClass">
      <formly-field [field]="chiledField" *ngFor="let chiledField of field.fieldGroup"></formly-field>
    </div>

    <div *ngIf="(!manualArrangement && (field.fieldGroup?.length === 0 || data?.length === 0)) && to.showNoDataLabel" class="w-full py-3 text-center">There is no data to display</div>

    <div *ngIf="!manualArrangement && field.fieldGroup?.length > 0 && data?.length > 0;" class="flex flex-row" [style]="style"  [ngClass]="innerClass">
      <ui-context-provider class="flex" [data]="datum" *ngFor="let datum of data;let i = index;">
        <formly-field [field]="menuItem"></formly-field>
      </ui-context-provider>
    </div>
  </div> -->

  <p *ngIf="!buttonItem" class="text-red-900">Please add the first child to see the content of dropdown button</p>

  <button *ngIf="buttonItem" (click)="openMenu()" data-dropdown-toggle="dropdownRadioBgHover" class="w-full min-w-30" type="button">
    <formly-field [field]="buttonItem"></formly-field>
  </button>

  <div class="fixed inset-0 bg-gray-900 bg-opacity-0 z-[13]" *ngIf="open" (click)="open=false"></div>

  <p *ngIf="!menuItem" class="text-red-900">Please add the second child to see the content of dropdown menu</p>
  <p *ngIf="!to.dataKey" class="text-red-900">Please set dataKey in templateOptions to see the content of dropdown menu</p>
  <div *ngIf="menuItem && to.dataKey && data.length > 0" class="absolute">
    <!-- Dropdown menu -->
    <div class="absolute top-0 px-2 z-[14] py-1 left-0 right-0 min-w-fit w-full min-w-30 divide-y bg-white divide-gray-100 rounded-lg shadow shadow-gray-300" [ngClass]="{'hidden': !open}">
        <ul class="space-y-1 divide-y-1 divide-gray-100 text-sm text-gray-700">
          <li *ngFor="let datum of data;let i = index;">
            <button (click)="menuSelected(datum); open=false" class="w-full" type="button">
              <ui-context-provider class="flex cursor-pointer" [data]="datum" >
                <formly-field [field]="menuItem"></formly-field>
              </ui-context-provider>
            </button>
          </li>
        </ul>
    </div>
  </div>
  `,
})
export class UiFormDropdownButtonComponent extends UiFormBaseField implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  manualArrangement = false;

  buttonItem: FormlyFieldConfig;
  menuItem: FormlyFieldConfig;

  data = []

  open = false;

  ngOnInit(): void {
    super.ngOnInit();

    if (this.field.fieldGroup.length > 0) {
      this.buttonItem = this.field.fieldGroup[0];
    }
    if (this.field.fieldGroup.length > 1) {
      this.menuItem = this.field.fieldGroup[1];
    }

    const dataKey = this.to.dataKey;
    if (dataKey) {

      const source = this.service.getValue(dataKey);
      if (source instanceof Observable) {
        source.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
          this.data = data
        })
      } else {
        this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if (_data) {
            const data = this.formService.getValueForKey(dataKey, _data);
            this.data = data;
          }
        })
      }
    } else {
      this.manualArrangement = true;
    }
  }

  openMenu() {
    if(this.data?.length > 0) this.open = true;
  }

  menuSelected(datum: any) {
    if(this.to.menuSelected) this.to.menuSelected(datum, this.service.getData());
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }
}
