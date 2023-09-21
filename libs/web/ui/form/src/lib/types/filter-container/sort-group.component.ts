import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ui-sort-group',
  template: `
    <div class="relative inline-block text-left">
      <div>
        <button (click)="sortExpanded=true" type="button" class="group inline-flex justify-center text-xl font-medium text-gray-700 dark:text-gray-50 hover:text-gray-900" id="mobile-menu-button" aria-expanded="false" aria-haspopup="true">
          Sort
          <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div class="fixed inset-0 bg-gray-900 bg-opacity-0 z-[13]" *ngIf="sortExpanded" (click)="sortExpanded=false"></div>
      <!--
        Dropdown menu, show/hide based on menu state.

        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      -->
      <div [ngClass]="SortDropdownClassName" class="absolute z-[14] left-0 mt-2 w-40 no-underline origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="mobile-menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100", Not Active: "" -->
          <span (click)="onSelected(item['expression'], i);" *ngFor="let item of options; let i = index;" href="javascript:;" [ngClass]="{'bg-gray-100': i === selected}" class="cursor-pointer block px-4 py-2 text-lg font-medium text-gray-900" role="menuitem" tabindex="-1" id="mobile-menu-item-0">{{ item['title'] }}</span>
        </div>
      </div>
    </div>
  `
})
export class SortGroupComponent {
  @Input() title: string
  @Input() options: any[]
  @Output() sortDidChange = new EventEmitter()

  selected: any
  sortExpanded = false;

  onSelected(value, index) {
    console.log({ value, index });
    this.selected = index;
    this.sortExpanded = false;
    this.sortDidChange.emit(value)
  }

  public get SortDropdownClassName() : string {
    if(this.sortExpanded) {
      return "transition ease-out duration-100 transform opacity-100 scale-100";
    } else {
      return "transition ease-in duration-75 transform opacity-0 scale-95"
    }
  }
}
