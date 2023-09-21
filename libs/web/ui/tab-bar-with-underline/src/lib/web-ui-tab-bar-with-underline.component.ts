import { Component, Input } from '@angular/core'

export interface TabDef {
  label: string
  path: string
}

@Component({
  selector: 'ui-tab-bar-with-underline',
  template: `
    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <select
          id="tabs"
          name="tabs"
          class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        >
          <ng-container *ngFor="let tab of tabDefs">
            <option>{{ tab.label }}</option>
          </ng-container>
          <!-- <option selected>My Account</option>
          <option>Team Members</option>
          <option>Billing</option> -->
        </select>
      </div>
      <div class="hidden sm:block">
        <nav
          class="relative text-gray-500 hover:text-gray-700  z-0 rounded-lg shadow flex divide-x dark:divide-gray-700 divide-gray-200"
          aria-label="Tabs"
        >
          <ng-container *ngFor="let tab of tabDefs; let first = first; let last = last">
            <a
              [routerLink]="tab.path"
              routerLinkActive="text-gray-900"
              aria-current="page"
              [class.rounded-l-lg]="first"
              [class.rounded-r-lg]="last"
              class="group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-800 dark:text-gray-300 py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10"
            >
              <span>{{ tab.label }}</span>
              <span
                [style.pointer-events]="'none'"
                [routerLink]="tab.path"
                routerLinkActive="bg-blue-500"
                aria-hidden="true"
                class="absolute inset-x-0 bottom-0 h-0.5"
              ></span>
            </a>
          </ng-container>
        </nav>
      </div>
    </div>
  `,
})
export class WebUiTabBarWithUnderlineComponent {
  @Input() tabDefs: TabDef[]
}
