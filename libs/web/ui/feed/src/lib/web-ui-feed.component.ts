import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-feed',
  template: `
    <!-- Feeds simple with icons -->

    <div class="flow-root">
      <ul class="-mb-8">
        <li *ngFor="let list of feedsListing; let i = inex; let last = last">
          <div class="relative pb-8">
            <span *ngIf="!last" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
            <div class="relative flex space-x-3">
              <div>
                <span
                  class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white {{
                    list.iconClass
                  }}"
                >
                  <!-- Heroicon name: solid/user -->
                  <ui-icon icon="{{ list.icon }}" size="{{ list.size }}"></ui-icon>
                </span>
              </div>
              <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                <div>
                  <p class="text-sm text-gray-500">
                    {{ list.heading }} <a href="#" class="font-medium text-gray-900">{{ list.title }}</a>
                  </p>
                </div>
                <div class="text-right text-sm whitespace-nowrap text-gray-500">
                  <time datetime="2020-09-20">{{ list.time }}</time>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- Feeds Stacked with avatars -->

    <div class="my-10">
      <ul class="divide-y divide-gray-200">
        <li class="py-4" *ngFor="let list of feedsListing; let i = inex">
          <div class="flex space-x-3">
            <img
              class="h-6 w-6 rounded-full"
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=CSFCItvz2d&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
              alt=""
            />
            <div class="flex-1 space-y-1">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium">{{ list.heading }}</h3>
                <p class="text-sm text-gray-500">{{ list.time }}</p>
              </div>
              <p class="text-sm text-gray-500">{{ list.title }}</p>
            </div>
          </div>
        </li>

        <!-- More items... -->
      </ul>
    </div>
  `,
})
export class WebUiFeedComponent {
  @Input() feedsListing: any
}
