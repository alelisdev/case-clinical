
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebPriorAuthorizationRequestFormStore } from './web-prior-authorization-request-form.store'
import { PriorAuthorizationRequest,ProcedureSite,SurgicalPosition,User,VisitKind,GuidelineUsed,AuthorizationKind,AuthorizationStatus,Patient } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-prior-authorization-request-form',
  providers: [WebPriorAuthorizationRequestFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(priorAuthorizationRequest))" [model]="priorAuthorizationRequest ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiPriorAuthorizationRequestComponent
    {
  @Input() priorAuthorizationRequest: PriorAuthorizationRequest = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentProcedureSiteId: ''
parentSurgicalPositionId: ''
parentMedicalProviderId: ''
parentReferredToId: ''
parentPrescriptionId: ''
parentVisitKindId: ''
parentGuidelineUsedId: ''
parentAuthorizationKindId: ''
parentAuthorizationStatusId: ''
parentBillId: ''
parentMedicalReportId: ''
parentPatientId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'procedure-site',
          'procedureSiteId',
        {
          defaultValues: {}, ////Set Parent Values
          createProcedureSite: (event) => {
            if(event?.name) {
              this.store.addProcedureSite(event)
              this.model.procedureSiteId = event.id
              this.form.controls['procedureSiteId'].patchValue(event.id)
              this.form.controls['procedureSiteId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterProcedureSites('').subscribe((values) => {
              this.model.procedureSiteId = selected?.id
              this.form.controls['procedureSiteId'].patchValue(selected?.id)
              this.form.controls['procedureSiteId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Procedure Site',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterProcedureSites,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterProcedureSites('').subscribe()
              this.route.params.pipe(pluck('procedureSiteId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentProcedureSiteId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'surgical-position',
          'surgicalPositionId',
        {
          defaultValues: {}, ////Set Parent Values
          createSurgicalPosition: (event) => {
            if(event?.name) {
              this.store.addSurgicalPosition(event)
              this.model.surgicalPositionId = event.id
              this.form.controls['surgicalPositionId'].patchValue(event.id)
              this.form.controls['surgicalPositionId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterSurgicalPositions('').subscribe((values) => {
              this.model.surgicalPositionId = selected?.id
              this.form.controls['surgicalPositionId'].patchValue(selected?.id)
              this.form.controls['surgicalPositionId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Surgical Position',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterSurgicalPositions,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterSurgicalPositions('').subscribe()
              this.route.params.pipe(pluck('surgicalPositionId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentSurgicalPositionId = s
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
          'medicalProviderId',
        {
          defaultValues: {}, ////Set Parent Values
          createUser: (event) => {
            if(event?.name) {
              this.store.addUser(event)
              this.model.medicalProviderId = event.id
              this.form.controls['medicalProviderId'].patchValue(event.id)
              this.form.controls['medicalProviderId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterUsers('').subscribe((values) => {
              this.model.medicalProviderId = selected?.id
              this.form.controls['medicalProviderId'].patchValue(selected?.id)
              this.form.controls['medicalProviderId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Medical Provider',
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
              this.route.params.pipe(pluck('medicalProviderId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentMedicalProviderId = s
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
          'referredToId',
        {
          defaultValues: {}, ////Set Parent Values
          createUser: (event) => {
            if(event?.name) {
              this.store.addUser(event)
              this.model.referredToId = event.id
              this.form.controls['referredToId'].patchValue(event.id)
              this.form.controls['referredToId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterUsers('').subscribe((values) => {
              this.model.referredToId = selected?.id
              this.form.controls['referredToId'].patchValue(selected?.id)
              this.form.controls['referredToId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Referred To',
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
              this.route.params.pipe(pluck('referredToId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentReferredToId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.file(
      'prescription',
      {
        label: 'Prescription',
        delete: (d) => {
          this.model.prescription = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.prescription = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
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
    )
,

  WebUiFormField.selectForm(
          'guideline-used',
          'guidelineUsedId',
        {
          defaultValues: {}, ////Set Parent Values
          createGuidelineUsed: (event) => {
            if(event?.name) {
              this.store.addGuidelineUsed(event)
              this.model.guidelineUsedId = event.id
              this.form.controls['guidelineUsedId'].patchValue(event.id)
              this.form.controls['guidelineUsedId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterGuidelineUseds('').subscribe((values) => {
              this.model.guidelineUsedId = selected?.id
              this.form.controls['guidelineUsedId'].patchValue(selected?.id)
              this.form.controls['guidelineUsedId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Guideline Used',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterGuidelineUseds,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterGuidelineUseds('').subscribe()
              this.route.params.pipe(pluck('guidelineUsedId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentGuidelineUsedId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'authorization-kind',
          'authorizationKindId',
        {
          defaultValues: {}, ////Set Parent Values
          createAuthorizationKind: (event) => {
            if(event?.name) {
              this.store.addAuthorizationKind(event)
              this.model.authorizationKindId = event.id
              this.form.controls['authorizationKindId'].patchValue(event.id)
              this.form.controls['authorizationKindId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterAuthorizationKinds('').subscribe((values) => {
              this.model.authorizationKindId = selected?.id
              this.form.controls['authorizationKindId'].patchValue(selected?.id)
              this.form.controls['authorizationKindId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Authorization Kind',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterAuthorizationKinds,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterAuthorizationKinds('').subscribe()
              this.route.params.pipe(pluck('authorizationKindId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAuthorizationKindId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'authorization-status',
          'authorizationStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          createAuthorizationStatus: (event) => {
            if(event?.name) {
              this.store.addAuthorizationStatus(event)
              this.model.authorizationStatusId = event.id
              this.form.controls['authorizationStatusId'].patchValue(event.id)
              this.form.controls['authorizationStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterAuthorizationStatuses('').subscribe((values) => {
              this.model.authorizationStatusId = selected?.id
              this.form.controls['authorizationStatusId'].patchValue(selected?.id)
              this.form.controls['authorizationStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Authorization Status',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterAuthorizationStatuses,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterAuthorizationStatuses('').subscribe()
              this.route.params.pipe(pluck('authorizationStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentAuthorizationStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.file(
      'bill',
      {
        label: 'Bill',
        delete: (d) => {
          this.model.bill = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.bill = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
    )
,

  WebUiFormField.file(
      'medicalReport',
      {
        label: 'Medical Report',
        delete: (d) => {
          this.model.medicalReport = {}
        },
        clickedLink: (item) => {console.log('clicked item', item)},
        multiple: false,
        onChange: (file) => {
          this.model.medicalReport = file
        }
      },
      {
        className: 'w-1/2  px-1',
      },
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
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.date('referredOn', { label: 'Referred On' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('approvedOn', { label: 'Approved On' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('effectiveAsOf', { label: 'Effective As Of' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('expiresOn', { label: 'Expires On' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('duration', { label: 'Duration' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('procedureDescription', { label: 'Procedure Description' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('remarks', { label: 'Remarks' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.checkbox('underwritingApproved', { label: 'Underwriting Approved' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('tpaApproved', { label: 'Tpa Approved' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('requiresMedicalDirector', { label: 'Requires Medical Director' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('reviewedOn', { label: 'Reviewed On' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('priorAuthorizationNumber', { label: 'Prior Authorization Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('caseManager', { label: 'Case Manager' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('memberNumber', { label: 'Member Number' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('medicalDirector', { label: 'Medical Director' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('tpaApprover', { label: 'Tpa Approver' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('underwriter', { label: 'Underwriter' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('guidelineRequires', { label: 'Guideline Requires' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
,
,
,
,
,
,
,
				])

]

  constructor(
    private readonly store: WebPriorAuthorizationRequestFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,referredOn,approvedOn,effectiveAsOf,expiresOn,duration,procedureSiteId,surgicalPositionId,procedureDescription,remarks,underwritingApproved,tpaApproved,requiresMedicalDirector,reviewedOn,medicalProviderId,referredToId,priorAuthorizationNumber,caseManager,memberNumber,medicalDirector,tpaApprover,underwriter,prescriptionId,visitKindId,guidelineUsedId,guidelineRequires,authorizationKindId,authorizationStatusId,billId,medicalReportId,patientId }) {
    
    if(this.parentProcedureSiteId != ''){
      procedureSiteId = this.parentProcedureSiteId
    }


    if(this.parentSurgicalPositionId != ''){
      surgicalPositionId = this.parentSurgicalPositionId
    }


    if(this.parentMedicalProviderId != ''){
      medicalProviderId = this.parentMedicalProviderId
    }


    if(this.parentReferredToId != ''){
      referredToId = this.parentReferredToId
    }


    if(this.parentPrescriptionId != ''){
      prescriptionId = this.parentPrescriptionId
    }


    if(this.parentVisitKindId != ''){
      visitKindId = this.parentVisitKindId
    }


    if(this.parentGuidelineUsedId != ''){
      guidelineUsedId = this.parentGuidelineUsedId
    }


    if(this.parentAuthorizationKindId != ''){
      authorizationKindId = this.parentAuthorizationKindId
    }


    if(this.parentAuthorizationStatusId != ''){
      authorizationStatusId = this.parentAuthorizationStatusId
    }


    if(this.parentBillId != ''){
      billId = this.parentBillId
    }


    if(this.parentMedicalReportId != ''){
      medicalReportId = this.parentMedicalReportId
    }


    if(this.parentPatientId != ''){
      patientId = this.parentPatientId
    }

    await this.store.createPriorAuthorizationRequestEffect({ name,referredOn,approvedOn,effectiveAsOf,expiresOn,duration,procedureSiteId,surgicalPositionId,procedureDescription,remarks,underwritingApproved,tpaApproved,requiresMedicalDirector,reviewedOn,medicalProviderId,referredToId,priorAuthorizationNumber,caseManager,memberNumber,medicalDirector,tpaApprover,underwriter,prescriptionId,visitKindId,guidelineUsedId,guidelineRequires,authorizationKindId,authorizationStatusId,billId,medicalReportId,patientId })

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
