import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { Subject, takeUntil } from 'rxjs';
import { UiFormBaseField } from '../../types/base-field-type';

@Component({
  template: `
  <as-split class='w-full flex-1 flex flex-row' [ngClass]="innerClass">
    <as-split-area *ngFor="let _ of [].constructor(splitCount); let i = index">
      <div *ngIf="getAreaVisibility(i, field.fieldGroup)" class="flex flex-col overflow-hidden"  >
        <div *ngIf="viewHeader" class="w-full h-full flex flex-col overflow-hidden items-center mb-2 py-5 px-6 bg-gray-200 border-gray-300 border-1">
        <span class="text-xl text-slate-800 font-medium leading-normal"> {{headerLists[i].title}} </span>
        </div>
        <formly-field [field]="getAreaField(i, field.fieldGroup)" ></formly-field>
      </div>
    </as-split-area>
  </as-split>
  `,
})
export class UiFormSplitComponent extends UiFormBaseField implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  innerClass = "";
  outerClass = "";
  splitCount = 1;
  headerLists : any[];
  viewHeader: false;
  ngOnInit(): void {
    super.ngOnInit();
 
    if(this.to.splitCount){
      this.splitCount = this.to.splitCount;
    }
    if(this.to.viewHeader){
      this.viewHeader = this.to.viewHeader
    }
    if(this.to.headerLists && this.viewHeader){
      this.headerLists = this.to.headerLists;
      for(let spindex = 0; spindex < this.splitCount;  spindex++  )
      {
        this.headerLists.push(spindex < this.to.headerLists.Length? this.to.headerLists[spindex] : 'Title' );
      }
    }

    const className = this.to.className;
    const { innerClass, outerClass } = this.tailwindService.splitClassName(className);
    this.innerClass = innerClass;
    this.outerClass = outerClass;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }

  getAreaVisibility(index: number, fieldGroup:[]){
    if(index < fieldGroup.length) return true;
    else return false;
  }

  getAreaField(index: number, fieldGroup:[]){
    if(index < fieldGroup.length) return fieldGroup[index];
    else return null;
  }
}
