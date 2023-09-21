
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebPriorAuthorizationDiagnosisCodeFormStore } from './web-prior-authorization-diagnosis-code-form.store'
import { PriorAuthorizationDiagnosisCode,DiagnosisCode,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-authorization-diagnosis-code-form',
  providers: [WebPriorAuthorizationDiagnosisCodeFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(priorAuthorizationDiagnosisCode))" [model]="priorAuthorizationDiagnosisCode ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiPriorAuthorizationDiagnosisCodeComponent
    {
  @Input() priorAuthorizationDiagnosisCode: PriorAuthorizationDiagnosisCode = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentDiagnosisCodeId: ''
parentPriorAuthorizationRequestId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'diagnosis-code',
          'diagnosisCodeId',
        {
          defaultValues: {}, ////Set Parent Values
          createDiagnosisCode: (event) => {
            if(event?.name) {
              this.store.addDiagnosisCode(event)
              this.model.diagnosisCodeId = event.id
              this.form.controls['diagnosisCodeId'].patchValue(event.id)
              this.form.controls['diagnosisCodeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterDiagnosisCodes('').subscribe((values) => {
              this.model.diagnosisCodeId = selected?.id
              this.form.controls['diagnosisCodeId'].patchValue(selected?.id)
              this.form.controls['diagnosisCodeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Diagnosis',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterDiagnosisCodes,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterDiagnosisCodes('').subscribe()
              this.route.params.pipe(pluck('diagnosisCodeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentDiagnosisCodeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'prior-authorization-request',
          'priorAuthorizationRequestId',
        {
          defaultValues: {}, ////Set Parent Values
          createPriorAuthorizationRequest: (event) => {
            if(event?.name) {
              this.store.addPriorAuthorizationRequest(event)
              this.model.priorAuthorizationRequestId = event.id
              this.form.controls['priorAuthorizationRequestId'].patchValue(event.id)
              this.form.controls['priorAuthorizationRequestId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPriorAuthorizationRequests('').subscribe((values) => {
              this.model.priorAuthorizationRequestId = selected?.id
              this.form.controls['priorAuthorizationRequestId'].patchValue(selected?.id)
              this.form.controls['priorAuthorizationRequestId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Prior Authorization Request',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterPriorAuthorizationRequests,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterPriorAuthorizationRequests('').subscribe()
              this.route.params.pipe(pluck('priorAuthorizationRequestId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPriorAuthorizationRequestId = s
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
})				])

]

  constructor(
    private readonly store: WebPriorAuthorizationDiagnosisCodeFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,diagnosisCodeId,priorAuthorizationRequestId }) {
    
    if(this.parentDiagnosisCodeId != ''){
      diagnosisCodeId = this.parentDiagnosisCodeId
    }


    if(this.parentPriorAuthorizationRequestId != ''){
      priorAuthorizationRequestId = this.parentPriorAuthorizationRequestId
    }

    await this.store.createPriorAuthorizationDiagnosisCodeEffect({ name,diagnosisCodeId,priorAuthorizationRequestId })

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
