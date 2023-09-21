import { Component, Input, TemplateRef, OnInit } from '@angular/core'

export interface DescriptionListItem {
  label?: string
  value?: string
}

export interface Tab {
  label?: string
  url?: string
}

@Component({
  selector: 'ui-description-list',
  template: `
    <div class="bg-transparent shadow overflow-hidden">
      <div *ngIf="title || subTitle" class="px-4 pt-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{{ title }}</h3>
        <div *ngIf="subTitleTemplate">
          <ng-container *ngTemplateOutlet="subTitleTemplate"></ng-container>
        </div>
        <div class="mt-3 sm:mt-4">
          <!-- Dropdown menu on small screens -->
          <div *ngIf="tabs" class="sm:hidden">
            <label for="current-tab" class="sr-only">Select a tab</label>
            <select
              [currentTab]="currentTab"
              (click)="setCurrentTab(tab)"
              id="current-tab"
              name="current-tab"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option *ngFor="let tab of tabs">{{ tab?.label }}</option>
            </select>
          </div>
          <!-- Tabs at small breakpoint and up -->
          <div *ngIf="tabs" class="hidden sm:block">
            <nav class="mb-4 flex space-x-8">
              <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
              <div *ngFor="let tab of tabs">
                <a
                  [routerLink]="tab.url"
                  (click)="setTab(tab)"
                  class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                >
                  {{ tab.label }}
                </a>
              </div>
            </nav>
          </div>
          <div>
            <div *ngIf="detailsTemplate && this.selectedTab.label === 'Details'">
              <ng-container *ngTemplateOutlet="detailsTemplate"></ng-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class WebUiDescriptionListComponent implements OnInit {
  @Input() title?: string
  @Input() subTitle?: string
  @Input() tabs?: Tab[]
  @Input() items: DescriptionListItem[]
  @Input() detailsTemplate: TemplateRef<any>
  @Input() subTitleTemplate: TemplateRef<any>

  selectedTab: Tab

  constructor() {}

  ngOnInit() {
    this.selectedTab = this.tabs[0]
    console.log('On Init, ', this.selectedTab)
  }

  setTab(tab) {
    this.selectedTab = tab

    console.log('Tab Data', this.selectedTab)
  }
}
