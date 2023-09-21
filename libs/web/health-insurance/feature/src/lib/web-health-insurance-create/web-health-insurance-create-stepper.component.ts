
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebHealthInsuranceCreateStore } from './web-health-insurance-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-health-insurance-create.component.html',
  providers: [WebHealthInsuranceCreateStore],
})
export class WebHealthInsuranceCreateComponent {
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
WebUiFormField.input('healthInsuranceKind', { label: 'Health Insurance Kind' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('identificationGroupNumber', { label: 'Identification Group Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('mediCalNumber', { label: 'Medi Cal Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('medicareNumber', { label: 'Medicare Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('policyNumber', { label: 'Policy Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('legalCaseId', { label: 'Legal Case Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true})
    				])

  ]

  constructor(
    private readonly store: WebHealthInsuranceCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createHealthInsurance(input) {


    this.store.createHealthInsuranceEffect(input)
  }
}
