import { DataContextService } from './../../context-provider/data-context.service';
import { ValueNode } from 'graphql';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ui-filter-group',
  template: `
    <div *ngIf="options$ | async as options" class="relative inline-block text-left">
      <div>
        <button (click)="expanded=true" type="button" class="group inline-flex items-center justify-center text-xl font-medium text-gray-700 hover:text-gray-900" aria-expanded="false">
          <span>{{ title }}</span>

          <!-- <span class="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700">1</span> -->
          <svg class="-mr-1 ml-1 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="fixed inset-0 bg-gray-900 bg-opacity-50 z-[13]" *ngIf="expanded" (click)="expanded=false"></div>
      <!--
        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      -->
      <div [ngClass]="ClassName" class=" absolute right-0 z-[14] mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
        <form class="space-y-4">
          <div *ngFor="let item of options" class="flex gap-2 items-center">
            <input (change)="valueChaned($event)" id="filter-category-0" name="category[]" [value]="item[valueProp]" type="checkbox" class="m-0 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            <label for="filter-category-0" class="leading-none m-0 whitespace-nowrap text-lg font-medium text-gray-900">{{ item[labelProp] }}</label>
          </div>
        </form>
      </div>
    </div>
  `
})
export class FilterGroupComponent implements OnInit {
  @Input() filterOption
  @Output() filterDidChange = new EventEmitter();

  key: string
  title: string
  labelProp: string
  valueProp: string
  options$

  selectedValues = []

  expanded = false;

  public get ClassName() : string {
    return this.expanded ? "transition ease-out duration-100 transform opacity-100 scale-100" : "transition ease-in duration-75 transform opacity-0 scale-95"
  }

  ngOnInit(): void {
    const { filterKey, source, title, labelProp, valueProp } = this.filterOption;
    this.key = filterKey;
    this.title = title;
    this.labelProp = labelProp;
    this.valueProp = valueProp;
    this.options$ = source
  }

  valueChaned($event) {
    const value = $event.target.value;
    if(this.selectedValues.includes(value)) {
      this.selectedValues = this.selectedValues.filter((el) => el !== value)
    } else {
      this.selectedValues.push(value)
    }
    this.filterDidChange.emit({ key: this.key, value: this.selectedValues })
  }
}
