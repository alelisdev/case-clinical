
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebPatientStudyFormStore } from './web-patient-study-form.store'
import { PatientStudy,Patient } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-patient-study-form',
  providers: [WebPatientStudyFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(patientStudy))" [model]="patientStudy ?? {}" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label="Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label="Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class WebFormsUiPatientStudyComponent
    {
  @Input() patientStudy: PatientStudy = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentPatientId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'patient',
          'patientId',
        {
          defaultValues: {}, ////Set Parent Values
          createPatient: (event) => {
            if(event?.name) {
              this.store.addPatient(event)
              this.model.patientId = event.id
              this.form.controls['patientId'].patchValue(event.id)
              this.form.controls['patientId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPatients('').subscribe((values) => {
              this.model.patientId = selected?.id
              this.form.controls['patientId'].patchValue(selected?.id)
              this.form.controls['patientId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Patient',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterPatients,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterPatients('').subscribe()
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
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
				])

]

  constructor(
    private readonly store: WebPatientStudyFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,patientId }) {
    
    if(this.parentPatientId != ''){
      patientId = this.parentPatientId
    }

    await this.store.createPatientStudyEffect({ name,patientId })

    await this.store.item$.pipe(
      tap((item) => {
        if(item) {
          this.send.emit(item)
        }
      })
    ).subscribe()
  }

  handleDiscardClick(event) { 
     this.send.emit(event)
  }
}
