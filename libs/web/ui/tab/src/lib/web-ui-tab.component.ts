import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'ui-tabs',
  styleUrls: ['./tabs.component.scss'],
  template: `
    <mat-tab-group class="h-100">
      <mat-tab
        *ngFor="let tab of tabs; let i = index; let last = last"
        [label]="tab.label"
      >
        <ng-template matTabContent>
          <ng-content *ngTemplateOutlet= "tab.content">
          </ng-content>
        </ng-template>
      </mat-tab>
    </mat-tab-group>
  `,
})
export class WebUiTabComponent {
  @Input() tabs?: Tabs
  @Input() active?: any
  @Input() styleType?: string
  @Output() tabSelected = new EventEmitter()


  clickHandler(tab: Tabs) {
    this.active = 9999
    // if (this.tabSelected) {
    //   this.tabSelected.emit([tab, this.options])
    // }
  }
}

export interface Tabs {
  name: string
  active?: boolean
  content?: any
  icon?: string
  notification?: number
}
