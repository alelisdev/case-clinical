
import { Component } from '@angular/core'

@Component({
  template: `
  <div class="flex flex-col w-full">
  <app-ng7-dynamic-breadcrumb class="flex flex-col w-full bg-white border-b pl-4">
  </app-ng7-dynamic-breadcrumb>
    <router-outlet></router-outlet>
    </div>
  `,
})
export class WebAccidentTypeFeatureComponent {
}
