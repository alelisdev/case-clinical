import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core'
// import { Crumb } from '@case-clinical/web/ui/breadcrumbs'
import { Observable, of } from 'rxjs'

export interface WebUiSidebarPageLink {
  label: string
  icon: string
  path: string
  id: string
}

@Component({
  selector: 'ui-sidebar-page',
  template: `
    <ui-page [headerTitle]="headerTitle">
      <div class="print:hidden lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav class="space-y-1">
            <ng-container *ngFor="let link of links">
              <a
                *ngIf="link?.id !== undefined"
                [routerLink]="[link?.path, link?.id]"
                class="text-gray-900 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 group rounded-md px-3 py-1 flex items-center text-sm font-medium"
                routerLinkActive="dark:text-white dark:bg-gray-800 bg-gray-50 text-blue-600 hover:text-blue-500"
              >
                <span class="truncate"> {{ link.label }} </span>
              </a>
              <a
                *ngIf="link?.id === undefined"
                [routerLink]="link?.path"
                class="text-gray-900 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 group rounded-md px-3 py-1 flex items-center text-sm font-medium"
                routerLinkActive="dark:text-white dark:bg-gray-800 bg-gray-50 text-blue-600 hover:text-blue-500"
              >
                <span class="truncate"> {{ link.label }} </span>
              </a>
            </ng-container>
          </nav>
        </aside>
        <div class="lg:col-span-9">
          <ng-content></ng-content>
        </div>
      </div>
    </ui-page>
  `,
})
export class WebUiSidebarPageComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  @Input() headerTitle: string
  // @Input() breadcrumbs: Crumb[]
  @Input() headerTemplate?: TemplateRef<any>
  @Input() links: Observable<WebUiSidebarPageLink[]> = of([])
}
