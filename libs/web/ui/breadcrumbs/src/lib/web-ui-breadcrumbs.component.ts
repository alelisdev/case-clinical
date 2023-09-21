import { Component, Input } from '@angular/core'

export interface Crumb {
  class?: string
  name: string
  active: string
  isactive: boolean
  tabHandler?: (Crumbs) => void
  content?: any
  path?: string
}

export enum ViewMode {
  FullWidthBar,
  SimpleChevron,
  StandardTop
}

@Component({
  selector: 'ui-breadcrumbs',
  templateUrl: './web-ui-breadcrumbs.component.html',
})

export class WebUiBreadcrumbsComponent {
  VIEW_MODE: typeof ViewMode = ViewMode
  @Input() viewMode?: ViewMode = ViewMode.StandardTop

  @Input() crumbs?: Crumb[]
  @Input() homePath?: string = ""
}
