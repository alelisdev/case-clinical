
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { Patient } from '@case-clinical/web/core/data-access'
import { WebPrescriptionCreateStore } from './web-prescription-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-prescription-create.component.html',
  providers: [WebPrescriptionCreateStore],
})
export class WebPrescriptionCreateComponent {
    readonly vm$ = this.store.vm$
    readonly patients$ = this.store.patients$
readonly documents$ = this.store.documents$

  model:any = {}

parentPatientId: ''
parentDocumentId: ''

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
WebUiFormField.input('medicalProvider', { label: 'Medical Provider' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('dateWritten', { label: 'Date Written' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('days', { label: 'Days' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('note', { label: 'Note' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.input('category', { label: 'Category' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('kind', { label: 'Kind' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('quantity', { label: 'Quantity' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('refills', { label: 'Refills' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('rxNumber', { label: 'Rx Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('sig', { label: 'Sig' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('strength', { label: 'Strength' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('unit', { label: 'Unit' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'})
    
  WebUiFormField.selectForm(
          'patient',
          'patientId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('patientId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPatientId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.file(
      'document',
      {
        label: 'Document',
        delete: (d) => {
          this.model.document = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.document = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
    )
				])

  ]

  constructor(
    private readonly store: WebPrescriptionCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPrescription(input) {

    if(this.parentPatientId != ''){
      input = {...input, patientId: this.parentPatientId} 
    }


    if(this.parentDocumentId != ''){
      input = {...input, documentId: this.parentDocumentId} 
    }


    this.store.createPrescriptionEffect(input)
  }
}
