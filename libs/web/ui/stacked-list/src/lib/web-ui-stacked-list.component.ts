import { Component, Input, TemplateRef } from '@angular/core'

export interface StackedListItem {
  title?: string
  subTitle?: string
  path?: string
  leftMeta?: {
    text?: string
    icon?: string
  }
}

@Component({
  selector: 'ui-stacked-list',
  template: `
    <div class="bg-white dark:bg-gray-800 shadow overflow-hidden">
      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li *ngFor="let item of items">
          <a [routerLink]="['./', item.path]" class="block hover:bg-gray-50 dark:hover:bg-gray-700">
            <div class="px-4 py-4 flex items-center sm:px-6">
              <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div class="truncate">
                  <div class="flex text-sm">
                    <p *ngIf="item.title" class="font-medium text-blue-600 dark:text-blue-200 truncate">
                      {{ item.title }}
                    </p>
                    <p *ngIf="item.subTitle" class="ml-1 flex-shrink-0 font-normal text-gray-500">
                      {{ item.subTitle }}
                    </p>
                  </div>
                  <div class="mt-2 flex">
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <ui-icon
                        class="mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                        [icon]="item.leftMeta?.icon"
                      ></ui-icon>
                      <p>
                        {{ item.leftMeta?.text | date }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div *ngIf="item.path" class="ml-5 h-5 w-5 flex-shrink-0">
                <ui-icon class="h-5 w-5 text-gray-400 dark:text-gray-500" icon="chevronRight"></ui-icon>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  `,
})
export class WebUiStackedListComponent {
  @Input() items: StackedListItem[]
}
