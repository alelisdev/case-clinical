import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-narrow-avatar-list',
  template: `
    <ul class="divide-y divide-gray-200">
      <li class="py-4 flex" *ngFor="let list of stackedList">
        <img
          class="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixqx=CSFCItvz2d&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">{{ list.name }}</p>
          <p class="text-sm text-gray-500">{{ list.email }}</p>
        </div>
      </li>
    </ul>
  `,
})
export class WebUiNarrowAvatarListComponent {
  @Input() stackedList: any
}
