
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebAppointmentFormStore } from './web-appointment-form.store'
import { Appointment,Location,Patient,LegalCase,AppointmentStatus } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-appointment-form',
  providers: [WebAppointmentFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(appointment))" [model]="appointment ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiAppointmentComponent
    {
  @Input() appointment: Appointment = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentLocationId: ''
parentPatientId: ''
parentLegalCaseId: ''
parentAppointmentStatusId: ''
parentVisitKindId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'location',
          'locationId',
        {
          defaultValues: {}, ////Set Parent Values
          createLocation: (event) => {
            if(event?.name) {
              this.store.addLocation(event)
              this.model.locationId = event.id
              this.form.controls['locationId'].patchValue(event.id)
              this.form.controls['locationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterLocations('').subscribe((values) => {
              this.model.locationId = selected?.id
              this.form.controls['locationId'].patchValue(selected?.id)
              this.form.controls['locationId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Location',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterLocations,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterLocations('').subscribe()
              this.route.params.pipe(pluck('locationId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLocationId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

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

  WebUiFormField.selectForm(
          'legal-case',
          'legalCaseId',
        {
          defaultValues: {}, ////Set Parent Values
          createLegalCase: (event) => {
            if(event?.name) {
              this.store.addLegalCase(event)
              this.model.legalCaseId = event.id
              this.form.controls['legalCaseId'].patchValue(event.id)
              this.form.controls['legalCaseId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterLegalCases('').subscribe((values) => {
              this.model.legalCaseId = selected?.id
              this.form.controls['legalCaseId'].patchValue(selected?.id)
              this.form.controls['legalCaseId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Legal Case',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterLegalCases,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterLegalCases('').subscribe()
              this.route.params.pipe(pluck('legalCaseId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentLegalCaseId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'appointment-status',
          'appointmentStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          createAppointmentStatus: (event) => {
            if(event?.name) {
              this.store.addAppointmentStatus(event)
              this.model.appointmentStatusId = event.id
              this.form.controls['appointmentStatusId'].patchValue(event.id)
              this.form.controls['appointmentStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterAppointmentStatuses('').subscribe((values) => {
              this.model.appointmentStatusId = selected?.id
              this.form.controls['appointmentStatusId'].patchValue(selected?.id)
              this.form.controls['appointmentStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Appointment Status',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterAppointmentStatuses,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterAppointmentStatuses('').subscribe()
              this.route.params.pipe(pluck('appointmentStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAppointmentStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,
WebUiFormField.selectForm(
  'visit-kind',
  'visitKindId',
{
  defaultValues: {}, ////Set Parent Values
  createVisitKind: (event) => {
    if(event?.name) {
      this.store.addVisitKind(event)
      this.model.visitKindId = event.id
      this.form.controls['visitKindId'].patchValue(event.id)
      this.form.controls['visitKindId'].markAsDirty()
      this.ref.markForCheck()
      this.ref.detectChanges()
    }
  },
  onChange: (selected) => {
    this.store.filterVisitKinds('').subscribe((values) => {
      this.model.visitKindId = selected?.id
      this.form.controls['visitKindId'].patchValue(selected?.id)
      this.form.controls['visitKindId'].markAsDirty()
      this.ref.markForCheck()
      this.ref.detectChanges()
    })
  },
  label: 'Visit Kind',
  valueProp: 'id',
  labelProp: 'name',
  source: this.store.filterVisitKinds,
  debounceTime: 5
},
{
  className: 'w-full md:w-1/2 xl:w-1/4 px-1',
  hooks: {
    onInit: async (field) => {
      this.store.filterVisitKinds('').subscribe()
      this.route.params.pipe(pluck('visitKindId')).subscribe((s) => {

      if (s != undefined || s != null) {
        this.parentVisitKindId = s
        field.hide = true
      }
    })
  },
}
}
),
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.date('appointmentDateAndTime', { label: 'Appointment Date And Time' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('checkedIn', { label: 'Checked In' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('checkedInDateTime', { label: 'Checked In Date Time' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('medicalReportUrl', { label: 'Medical Report Url' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('billUrl', { label: 'Bill Url' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('duration', { label: 'Duration' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('notes', { label: 'Notes' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('recurringEventId', { label: 'Recurring Event Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.checkbox('isFirstInstance', { label: 'Is First Instance' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('description', { label: 'Description' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('start', { label: 'Start' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('end', { label: 'End' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('allDay', { label: 'All Day' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.input('recurrence', { label: 'Recurrence' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
				])

]

  constructor(
    private readonly store: WebAppointmentFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,medicalReportUrl,billUrl,duration,patientId,legalCaseId,appointmentStatusId, visitKindId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence }) {
    
    if(this.parentLocationId != ''){
      locationId = this.parentLocationId
    }


    if(this.parentPatientId != ''){
      patientId = this.parentPatientId
    }


    if(this.parentLegalCaseId != ''){
      legalCaseId = this.parentLegalCaseId
    }


    if(this.parentAppointmentStatusId != ''){
      appointmentStatusId = this.parentAppointmentStatusId
    }

    if(this.parentVisitKindId != ''){
      visitKindId = this.parentVisitKindId
    }
    await this.store.createAppointmentEffect({ name,appointmentDateAndTime,locationId,checkedIn,checkedInDateTime,medicalReportUrl,billUrl,duration,patientId,legalCaseId,appointmentStatusId, visitKindId,notes,recurringEventId,isFirstInstance,description,start,end,allDay,recurrence })

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
