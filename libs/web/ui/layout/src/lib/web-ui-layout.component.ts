import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-layout',
  template: `
    <div>
      {{ sidebarTitle }}
    </div>
  `,
})
export class WebUiLayoutComponent {
  @Input() sidebarTitle: string
}
