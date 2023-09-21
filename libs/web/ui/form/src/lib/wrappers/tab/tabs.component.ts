import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'ui-formly-field-tabs',
  styleUrls: ['./tabs.component.scss'],
  template: `
    <div class="mb-3">
      <mat-form-field class="fuse-mat-no-subscript w-full" style="font-size: 12px;" [ngClass]="{ 'sm:hidden': !to.narrow }">
        <mat-select
            [value]="selectedIndex"
            (selectionChange)="onSelectionChanged($event)">
            <ng-container *ngFor="let tab of field.fieldGroup; let i = index">
                <mat-option [value]="i">{{tab.templateOptions?.label}}</mat-option>
            </ng-container>
        </mat-select>
      </mat-form-field>

      <div class="hidden" [ngClass]="{ 'sm:block': !to.narrow }">
        <div [class]="BorderClassName">
          <nav [class]="NavClassNames()" aria-label="Tabs">
            <a
              *ngFor="let tab of field.fieldGroup; let i = index;"
              (click)="setTab(i)"
              href="javascript:;"
              [ngClass]="ClassNames(i)"
            >
              <ui-icon *ngIf="ShwIcon" [icon]="tab.templateOptions.icon" class="h-6 w-6"></ui-icon>
              {{ tab.templateOptions?.label }}
              <span
                *ngIf="to.format === 'bar_underline'"
                aria-hidden="true"
                class="absolute inset-x-0 bottom-0 h-0.5"
                [ngClass]="{'bg-indigo-500': selectedIndex === i, 'bg-transparent': selectedIndex !== i}"
                ></span>

                <span
                  *ngIf="to.format === 'underline_badge' && tab.templateOptions.badge > 0"
                  class="hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                  [ngClass]="{'bg-indigo-100 text-primary': selectedIndex === i, 'bg-gray-100 text-gray-900': selectedIndex !== i}"
                >{{ tab.templateOptions.badge }}</span>
            </a>
          </nav>
        </div>
      </div>
      <formly-field [field]="field.fieldGroup[selectedIndex]"></formly-field>
    </div>
  `,
})
export class FormlyFieldTabsComponent extends FieldType implements OnInit {
  selectedIndex = 0;
  tabsCount = 0;

  ngOnInit(): void {
    this.tabsCount = this.field.fieldGroup.length;
    if(this.to.currentIndex) {
      const currentIndex = this.to.currentIndex;

      this.selectedIndex = currentIndex <= this.tabsCount-1 ? currentIndex : this.tabsCount-1
    }
  }

  onSelectionChanged($event) {
    this.setTab($event.value)
  }

  setTab(index) {
    if(index === this.selectedIndex) return;

    this.selectedIndex = index;
    if(this.to.selectionChanged) this.to.selectionChanged(index);
  }

  public get ShwIcon() : boolean {
    return this.to.format === 'underline_icon';
  }

  public get BorderClassName(): string {
    switch(this.to.format) {
      case 'underline':
      case 'underline_icon':
      case 'full_width_underline':
      case 'underline_badge':
        return 'border-b border-gray-200';
      default:
        return '';
    }
  }

  public NavClassNames(): string {
    switch(this.to.format) {
      case 'underline':
      case 'underline_icon':
      case 'underline_badge':
        return '-mb-px flex space-x-5';
      case 'pills':
      case 'pills_gray':
      case 'pills_brand':
        return 'flex space-x-2'
      case 'full_width_underline':
        return '-mb-px flex';
      case 'bar_underline':
        return 'isolate flex divide-x divide-gray-200 rounded-lg shadow';
      default:
        return '';
    }
  }

  public ClassNames(index: number) : string {
    let className = '';
    switch(this.to.format) {
      case 'underline':
      case 'underline_icon':
        className = 'hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg inline-flex gap-1 items-center';
        if(this.selectedIndex === index) {
          return `${className} border-primary text-primary `;
        } else {
          return `${className} border-transparent text-gray-500`;
        }
      case 'pills':
        className = 'hover:text-gray-700 px-3 py-2 font-medium text-lg rounded-md';
        if(this.selectedIndex === index) {
          return `${className} bg-gray-100 text-gray-700`;
        } else {
          return `${className} text-gray-500`;
        }
      case 'pills_gray':
        className = 'px-3 py-2 font-medium text-lg rounded-md';
        if(this.selectedIndex === index) {
          return `${className} bg-gray-200 text-gray-800`;
        } else {
          return `${className} text-gray-600 hover:text-gray-800`;
        }
      case 'pills_brand':
        className = 'px-3 py-2 font-medium text-lg rounded-md';
        if(this.selectedIndex === index) {
          return `${className} bg-indigo-100 text-indigo-700`;
        } else {
          return `${className} text-gray-500 hover:text-gray-700`;
        }
      case 'full_width_underline':
        className = `w-1/${this.tabsCount} py-4 px-1 text-center border-b-2 font-medium text-lg`;
        if(this.selectedIndex === index) {
          return `${className} border-primary text-primary `;
        } else {
          return `${className} border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`;
        }
      case 'bar_underline':
        className = 'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-lg font-medium text-center hover:bg-gray-50 focus:z-10';
        if(this.selectedIndex === index) {
          return `${className} text-gray-900`;
        } else {
          return `${className} text-gray-500 hover:text-gray-700`;
        }
      case 'underline_badge':
        className = 'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-lg';
        if(this.selectedIndex === index) {
          return `${className} border-primary  text-primary`;
        } else {
          return `${className} border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200`;
        }
      default:
        className = 'hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg inline-flex gap-1 items-center';
        if(this.selectedIndex === index) {
          return `${className} border-primary text-primary`;
        } else {
          return `${className} border-transparent text-gray-500`;
        }
    }
  }
}
