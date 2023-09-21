import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'ui-page-header',
  template: `
    <div class="flex items-center px-6 py-3 border-b   dark:border-gray-700 border-gray-200 dark:text-gray-100">
      <ng-container *ngIf="showBackButton">
        <ui-button link=".." class="mr-4" label="Back" variant="white" [showLeftArrowIcon]="true"></ui-button>
      </ng-container>
      <div class="text-lg font-medium text-gray-900 dark:text-gray-100">
        {{ title }}
      </div>

      <ng-container *ngIf="controls">
        <ng-container *ngTemplateOutlet="controls"></ng-container>
      </ng-container>

      <ng-container *ngIf="linkTitle && linkPath">
        <ui-button class="ml-auto" [label]="linkTitle" [link]="linkPath"></ui-button>
      </ng-container>
    </div>
  `,
})
export class WebUiPageHeaderComponent {
  @Input() title?: string
  @Input() linkPath?: string
  @Input() linkTitle?: string
  @Input() showBackButton?: boolean
  @Input() controls?: TemplateRef<any>
}
