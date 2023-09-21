
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebMedLevelCreateStore } from './web-med-level-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-med-level-create.component.html',
  providers: [WebMedLevelCreateStore],
})
export class WebMedLevelCreateComponent {
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
WebUiFormField.currency('approvedSiteCosts', { label: 'Approved Site Costs' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('maximumMedicalBillsToDate', { label: 'Maximum Medical Bills to Date' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,

    				])

  ]

  constructor(
    private readonly store: WebMedLevelCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createMedLevel(input) {


    this.store.createMedLevelEffect(input)
  }
}
