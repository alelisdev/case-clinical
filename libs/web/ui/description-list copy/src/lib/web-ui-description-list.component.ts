import { Component, Input } from '@angular/core'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

@Component({
  selector: 'ui-description-list',
  template: `
    <!-- This example requires Tailwind CSS v2.0+ -->

    <div
      class="bg-{{ background ? background : 'gray' }}-200 shadow overflow-hidden sm:rounded-lg my-2 dark:bg-gray-800"
    >
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
          {{ formTitle }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
          {{ tagLine }}
        </p>
      </div>
      <ul>
        <li *ngFor="let info of data; let i = index">
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" *ngIf="!info.type">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">
                  <div class="inline-flex space-x-2">
                    <ui-icon
                      *ngIf="info.icon && (showIcon === 'true' || showIcon === true)"
                      size="lg"
                      icon="{{ info.icon }}"
                      class="h-5 w-5 "
                    ></ui-icon>
                    <span>{{ info.title }}</span>
                  </div>
                </dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                  {{ info.value }}
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" *ngIf="info.type">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">
                  <div class="inline-flex space-x-2">
                    <ui-icon
                      *ngIf="info.icon && (showIcon === 'true' || showIcon === true)"
                      size="lg"
                      icon="{{ info.icon }}"
                      class="h-5 w-5 "
                    ></ui-icon>
                    <span>{{ info.title }}</span>
                  </div>
                </dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                  <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div class="w-0 flex-1 flex items-center">
                        <!-- Heroicon name: solid/paper-clip -->
                        <svg
                          class="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-200"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="ml-2 flex-1 w-0 truncate">
                          {{ info.value[0] }}
                        </span>
                      </div>
                      <div class="ml-4 flex-shrink-0">
                        <a
                          href="javascript:void(0)"
                          (click)="onDownload()"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                    <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div class="w-0 flex-1 flex items-center">
                        <!-- Heroicon name: solid/paper-clip -->
                        <svg
                          class="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-200"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="ml-2 flex-1 w-0 truncate">
                          {{ info.value[1] }}
                        </span>
                      </div>
                      <div class="ml-4 flex-shrink-0">
                        <a
                          href="javascript:void(0)"
                          (click)="onDownload()"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </li>
      </ul>
    </div>
  `,
})
export class WebUiDescriptionListComponent {
  @Input() data: any
  @Input() tagLine: any
  @Input() formTitle: any
  @Input() background: string
  @Input() showIcon: boolean
  constructor(public toast: WebUiToastService) {}
  public onDownload() {
    this.toast.success('Downloaded compelete!', { duration: 3000 })
  }
}
