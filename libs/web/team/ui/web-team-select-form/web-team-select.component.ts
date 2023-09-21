

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTeamFeatureStore } from '@case-clinical/web/team/shared'
import {Team} from '@case-clinical/web/core/data-access'


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
      <ui-team-form
        class="flex-grow flex flex-col"
        [formName]="'team_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [team]="team"
      >
      >
      </ui-team-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-team-form
        class="flex-grow flex flex-col"
        [formName]="'team_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [team]="{}"
      >
      </ui-team-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-team-select-table-view
        class="w-full h-full bg-white"
        [teams]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-team-select-table-view>
    </ng-template>
  `,
})
export class WebTeamSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  team: Team

  constructor(private store: WebTeamFeatureStore) {
    super()
    this.store.loadTeamsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.teams$.pipe(
      switchMap((teams) => {
        return of(teams)
      }),
    )
  }
}

