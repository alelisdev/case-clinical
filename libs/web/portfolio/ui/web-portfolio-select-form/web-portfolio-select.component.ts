

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPortfolioFeatureStore } from '@case-clinical/web/portfolio/shared'
import {Portfolio} from '@case-clinical/web/core/data-access'


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
      <ui-portfolio-form
        class="flex-grow flex flex-col"
        [formName]="'portfolio_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [portfolio]="portfolio"
      >
      >
      </ui-portfolio-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-portfolio-form
        class="flex-grow flex flex-col"
        [formName]="'portfolio_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [portfolio]="{}"
      >
      </ui-portfolio-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-portfolio-select-table-view
        class="w-full h-full bg-white"
        [portfolios]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-portfolio-select-table-view>
    </ng-template>
  `,
})
export class WebPortfolioSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  portfolio: Portfolio

  constructor(private store: WebPortfolioFeatureStore) {
    super()
    this.store.loadPortfoliosEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.portfolios$.pipe(
      switchMap((portfolios) => {
        return of(portfolios)
      }),
    )
  }
}

