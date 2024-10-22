import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Email } from '@case-clinical/mobile/core/data-access'

@Component({
  selector: 'account-email-list',
  template: `
    <ng-container *ngFor="let item of emails">
      <div class="">
        <div class="">
          {{ item.email }}
        </div>
        <div class="">
          <span class="" *ngIf="item.primary"> Primary </span>
          <span
            class=""
            [ngClass]="{
              'bg-yellow-100 text-yellow-800': item.public,
              'bg-green-100 text-green-800': !item.public
            }"
            [class.badge-primary]="!item.public"
            [class.badge-warning]="item.public"
          >
            {{ item.public ? 'Public' : 'Private' }}
          </span>
          <button class="" (click)="deleteEmail.next(item)">
            <ui-icon icon="trash"></ui-icon>
          </button>
        </div>
      </div>
    </ng-container>
  `,
})
export class AccountUiEmailListComponent {
  @Input() emails: Email[]
  @Output() deleteEmail = new EventEmitter<Email>()
}
