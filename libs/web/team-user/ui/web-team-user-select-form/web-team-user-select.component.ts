

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTeamUserFeatureStore } from '@case-clinical/web/team-user/shared'
import {TeamUser} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [upModel]="model"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-team-user-form
        class="flex-grow flex flex-col"
        [formName]="'teamUser_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [teamUser]="teamUser"
      >
      >
      </ui-team-user-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-team-user-form
        class="flex-grow flex flex-col"
        [formName]="'teamUser_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [teamUser]="{}"
      >
      </ui-team-user-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-team-user-select-table-view
        class="w-full h-full bg-white"
        [teamUsers]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-team-user-select-table-view>
    </ng-template>
  `,
})
export class WebTeamUserSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  teamUser: TeamUser

  constructor(private store: WebTeamUserFeatureStore) {
    super()
    this.store.loadTeamUsersEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.teamUsers$.pipe(
      switchMap((teamUsers) => {
        return of(teamUsers)
      }),
    )
  }
}

