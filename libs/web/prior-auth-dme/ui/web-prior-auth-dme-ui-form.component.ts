
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebPriorAuthDmeFormStore } from './web-prior-auth-dme-form.store'
import { PriorAuthDme,PriorAuthorizationRequest,DurableMedicalEquipment } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-auth-dme-form',
  providers: [WebPriorAuthDmeFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(priorAuthDme))" [model]="priorAuthDme ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiPriorAuthDmeComponent
    {
  @Input() priorAuthDme: PriorAuthDme = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentPriorAuthId: ''
parentDurableMedicalEquipmentId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'prior-authorization-request',
          'priorAuthId',
        {
          defaultValues: {}, ////Set Parent Values
          createPriorAuthorizationRequest: (event) => {
            if(event?.name) {
              this.store.addPriorAuthorizationRequest(event)
              this.model.priorAuthId = event.id
              this.form.controls['priorAuthId'].patchValue(event.id)
              this.form.controls['priorAuthId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPriorAuthorizationRequests('').subscribe((values) => {
              this.model.priorAuthId = selected?.id
              this.form.controls['priorAuthId'].patchValue(selected?.id)
              this.form.controls['priorAuthId'].markAsDirty()
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
              this.route.params.pipe(pluck('priorAuthId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPriorAuthId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'durable-medical-equipment',
          'durableMedicalEquipmentId',
        {
          defaultValues: {}, ////Set Parent Values
          createDurableMedicalEquipment: (event) => {
            if(event?.name) {
              this.store.addDurableMedicalEquipment(event)
              this.model.durableMedicalEquipmentId = event.id
              this.form.controls['durableMedicalEquipmentId'].patchValue(event.id)
              this.form.controls['durableMedicalEquipmentId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterDurableMedicalEquipments('').subscribe((values) => {
              this.model.durableMedicalEquipmentId = selected?.id
              this.form.controls['durableMedicalEquipmentId'].patchValue(selected?.id)
              this.form.controls['durableMedicalEquipmentId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Durable Medical Equipment',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterDurableMedicalEquipments,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterDurableMedicalEquipments('').subscribe()
              this.route.params.pipe(pluck('durableMedicalEquipmentId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentDurableMedicalEquipmentId = s
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
WebUiFormField.input('estimatedCost', { label: 'Estimated Cost' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'})				])

]

  constructor(
    private readonly store: WebPriorAuthDmeFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,estimatedCost,priorAuthId,durableMedicalEquipmentId }) {
    
    if(this.parentPriorAuthId != ''){
      priorAuthId = this.parentPriorAuthId
    }


    if(this.parentDurableMedicalEquipmentId != ''){
      durableMedicalEquipmentId = this.parentDurableMedicalEquipmentId
    }

    await this.store.createPriorAuthDmeEffect({ name,estimatedCost,priorAuthId,durableMedicalEquipmentId })

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
