
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'

import { WebProcedureOrTreatmentRequestCreateStore } from './web-procedure-or-treatment-request-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-procedure-or-treatment-request-create.component.html',
  providers: [WebProcedureOrTreatmentRequestCreateStore],
})
export class WebProcedureOrTreatmentRequestCreateComponent {
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
WebUiFormField.input('patientId', { label: 'Patient Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('legalCaseId', { label: 'Legal Case Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('facilityVendorId', { label: 'Facility Vendor Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('facilityContractId', { label: 'Facility Contract Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('anesthesiaVendorId', { label: 'Anesthesia Vendor Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('anesthesiaVendorContractId', { label: 'Anesthesia Vendor Contract Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('requestingProviderId', { label: 'Requesting Provider Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
WebUiFormField.input('procedureTypeId', { label: 'Procedure Type Id' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1', hide: true}),
,
,
WebUiFormField.input('status', { label: 'Status' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    				])

  ]

  constructor(
    private readonly store: WebProcedureOrTreatmentRequestCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createProcedureOrTreatmentRequest(input) {


    this.store.createProcedureOrTreatmentRequestEffect(input)
  }
}
