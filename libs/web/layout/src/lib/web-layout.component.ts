import { Component } from '@angular/core'
import { WebLayoutStore } from './web-layout.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="flex flex-col dark:bg-gray-900 text-gray-900 dark:text-gray-300">
        <div>
          <layout-header
            [logo]="vm?.layout?.logo"
            [links]="vm?.links?.main"
            [user]="vm?.user"
            [profileLinks]="vm.links?.profile"
          >
          </layout-header>
        </div>
        <main>
          <router-outlet></router-outlet>
        </main>
      </div>
    </ng-container>
  `,
  providers: [WebLayoutStore],
})
export class WebLayoutComponent {
  vm$ = this.layoutStore.vm$

  constructor(private readonly layoutStore: WebLayoutStore) {}
}
