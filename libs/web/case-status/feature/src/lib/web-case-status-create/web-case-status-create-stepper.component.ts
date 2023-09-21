
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebCaseStatusCreateStore } from './web-case-status-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-case-status-create.component.html',
  providers: [WebCaseStatusCreateStore],
})
export class WebCaseStatusCreateComponent {
    readonly vm$ = this.store.vm$
    

  model:any = {}



  options = {
      formState: {
        mainModel: this.model,
      },
    }

  fields = [
    				WebUiFormField.fieldRow([
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'w-full sm:w-1/2 md:w-1/4  px-1'
}),
WebUiFormField.number('orderIndex', { label: 'Order Index' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('color', { label: 'Color' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('isDefault', { label: 'Is Default' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.number('tickerDate', { label: 'Ticker Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.number('maxTickerDate', { label: 'Max Ticker Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('moveDocs', { label: 'Move Docs' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.checkbox('removed', { label: 'Removed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('createdBy', { label: 'Created by' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('migSource', { label: 'Mig Source' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('entity', { label: 'Entity' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('temp', { label: 'Temp' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),

    				])

  ]

  constructor(
    private readonly store: WebCaseStatusCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createCaseStatus(input) {


    this.store.createCaseStatusEffect(input)
  }
}
