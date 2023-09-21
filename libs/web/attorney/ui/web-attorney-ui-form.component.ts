
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebAttorneyFormStore } from './web-attorney-form.store'
import { Attorney,Firm,AttorneyStatus,AttorneyType,User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-attorney-form',
  providers: [WebAttorneyFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(attorney))" [model]="attorney ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiAttorneyComponent
    {
  @Input() attorney: Attorney = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentFirmId: ''
parentAttorneyStatusId: ''
parentAttorneyTypeId: ''
parentCreatedById: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'firm',
          'firmId',
        {
          defaultValues: {}, ////Set Parent Values
          createFirm: (event) => {
            if(event?.name) {
              this.store.addFirm(event)
              this.model.firmId = event.id
              this.form.controls['firmId'].patchValue(event.id)
              this.form.controls['firmId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterFirms('').subscribe((values) => {
              this.model.firmId = selected?.id
              this.form.controls['firmId'].patchValue(selected?.id)
              this.form.controls['firmId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Firm',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterFirms,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterFirms('').subscribe()
              this.route.params.pipe(pluck('firmId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentFirmId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'attorney-status',
          'attorneyStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          createAttorneyStatus: (event) => {
            if(event?.name) {
              this.store.addAttorneyStatus(event)
              this.model.attorneyStatusId = event.id
              this.form.controls['attorneyStatusId'].patchValue(event.id)
              this.form.controls['attorneyStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterAttorneyStatuses('').subscribe((values) => {
              this.model.attorneyStatusId = selected?.id
              this.form.controls['attorneyStatusId'].patchValue(selected?.id)
              this.form.controls['attorneyStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Attorney Status',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterAttorneyStatuses,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterAttorneyStatuses('').subscribe()
              this.route.params.pipe(pluck('attorneyStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAttorneyStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'attorney-type',
          'attorneyTypeId',
        {
          defaultValues: {}, ////Set Parent Values
          createAttorneyType: (event) => {
            if(event?.name) {
              this.store.addAttorneyType(event)
              this.model.attorneyTypeId = event.id
              this.form.controls['attorneyTypeId'].patchValue(event.id)
              this.form.controls['attorneyTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterAttorneyTypes('').subscribe((values) => {
              this.model.attorneyTypeId = selected?.id
              this.form.controls['attorneyTypeId'].patchValue(selected?.id)
              this.form.controls['attorneyTypeId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Attorney Type',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterAttorneyTypes,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterAttorneyTypes('').subscribe()
              this.route.params.pipe(pluck('attorneyTypeId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAttorneyTypeId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'user',
          'createdById',
        {
          defaultValues: {}, ////Set Parent Values
          createUser: (event) => {
            if(event?.name) {
              this.store.addUser(event)
              this.model.createdById = event.id
              this.form.controls['createdById'].patchValue(event.id)
              this.form.controls['createdById'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterUsers('').subscribe((values) => {
              this.model.createdById = selected?.id
              this.form.controls['createdById'].patchValue(selected?.id)
              this.form.controls['createdById'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Created By',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterUsers,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterUsers('').subscribe()
              this.route.params.pipe(pluck('createdById')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCreatedById = s
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
WebUiFormField.input('title', { label: 'Title' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('firstName', { label: 'First Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('lastName', { label: 'Last Name' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('address', { label: 'Address' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('city', { label: 'City' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('state', { label: 'State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('zip', { label: 'Zip' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('email', { label: 'Email' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('direct', { label: 'Direct' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('fax', { label: 'Fax' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('cellPhone', { label: 'Cell Phone' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('barNumber', { label: 'Bar Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('barState', { label: 'Bar State' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('doNotDisturb', { label: 'Do Not Disturb' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('temp', { label: 'Temp' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('dateCreated', { label: 'Date Created' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('removed', { label: 'Removed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('migSource', { label: 'Mig Source' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('entity', { label: 'Entity' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('firmNolongerNeeded', { label: 'Firm Nolonger Needed' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
				])

]

  constructor(
    private readonly store: WebAttorneyFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,firmId,attorneyStatusId,attorneyTypeId,title,firstName,lastName,address,city,state,zip,email,direct,fax,cellPhone,barNumber,barState,doNotDisturb,temp,createdById,dateCreated,removed,migSource,entity,firmNolongerNeeded }) {
    
    if(this.parentFirmId != ''){
      firmId = this.parentFirmId
    }


    if(this.parentAttorneyStatusId != ''){
      attorneyStatusId = this.parentAttorneyStatusId
    }


    if(this.parentAttorneyTypeId != ''){
      attorneyTypeId = this.parentAttorneyTypeId
    }


    if(this.parentCreatedById != ''){
      createdById = this.parentCreatedById
    }

    await this.store.createAttorneyEffect({ name,firmId,attorneyStatusId,attorneyTypeId,title,firstName,lastName,address,city,state,zip,email,direct,fax,cellPhone,barNumber,barState,doNotDisturb,temp,createdById,dateCreated,removed,migSource,entity,firmNolongerNeeded })

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
