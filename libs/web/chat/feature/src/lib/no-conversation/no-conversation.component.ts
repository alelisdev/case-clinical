import { Component } from "@angular/core";


@Component({
  selector: 'no-conversation',
  template: `
    <div
      class="flex-auto border-l z-20 absolute inset-0 lg:static lg:inset-auto flex">
      <div class="flex flex-col flex-auto items-center justify-center bg-gray-100 dark:bg-transparent">
          <mat-icon class="icon-size-24" [svgIcon]="'iconsmind:speach_bubble'"></mat-icon>
          <div class="mt-4 text-2xl font-semibold tracking-tight text-secondary">Select a conversation or start a
              new chat</div>
      </div>
    </div>
  `
})
export class NoConversationComponent {
  constructor() {}
}