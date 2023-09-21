import { Component, Input, TemplateRef } from '@angular/core'

@Component({
  selector: 'ui-card-header',
  template: `
    <div class="bg-white dark:bg-gray-800 px-4 py-5 border-gray-200 dark:border-gray-700 sm:px-6">
      <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div class="ml-4 mt-4 w-full md:w-max lg:w-max justify-center flex">
          <div class="flex items-center">
            <ui-button
              *ngIf="enableBackButton"
              [routerLink]="['./..']"
              class="mr-4"
              [label]="'Back'"
              [variant]="'white'"
              [icon]="'arrowLeft'"
            ></ui-button>
            <div *ngIf="avatarSrc" class="flex-shrink-0">
              <img class="h-12 w-12 rounded-full" [src]="avatarSrc" alt="" />
            </div>

            <div [class.ml-4]="avatarSrc">
              <h3 *ngIf="title" class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{{ title }}</h3>
              <p *ngIf="subTitle" class="text-sm text-gray-500 dark:text-gray-400">
                <a href="#"> {{ subTitle }} </a>
              </p>
            </div>
          </div>
        </div>
        <ui-formly-form-select *ngIf="formName" [formName]="formName"></ui-formly-form-select>
        <div *ngIf="controlsTemplate" class="ml-4 mt-4 items-center flex">
          <ng-container *ngTemplateOutlet="controlsTemplate"></ng-container>
        </div>
      </div>
    </div>
  `,
})
export class WebUiCardHeaderComponent {
  @Input() avatarSrc?: string
  @Input() title?: string
  @Input() formName?: string
  @Input() subTitle?: string
  @Input() controlsTemplate?: TemplateRef<any>
  @Input() enableBackButton?: boolean
}
