
import { Component } from '@angular/core'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { ProcedureSite,SurgicalPosition,ClinicalProvider,VisitKind,GuidelineUsed,AuthorizationKind,AuthorizationStatus,Patient,CaseProcedure } from '@case-clinical/web/core/data-access'
import { WebPriorAuthorizationRequestCreateStore } from './web-prior-authorization-request-create.store'
import { ActivatedRoute,Router } from '@angular/router'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-prior-authorization-request-create.component.html',
  providers: [WebPriorAuthorizationRequestCreateStore],
})
export class WebPriorAuthorizationRequestCreateComponent {
    readonly vm$ = this.store.vm$
    readonly procedureSites$ = this.store.procedureSites$
readonly surgicalPositions$ = this.store.surgicalPositions$
readonly clinicalProviders$ = this.store.clinicalProviders$
readonly documents$ = this.store.documents$
readonly visitKinds$ = this.store.visitKinds$
readonly guidelineUseds$ = this.store.guidelineUseds$
readonly authorizationKinds$ = this.store.authorizationKinds$
readonly authorizationStatuses$ = this.store.authorizationStatuses$
readonly patients$ = this.store.patients$
readonly caseProcedures$ = this.store.caseProcedures$

  model:any = {}

parentProcedureSiteId: ''
parentSurgicalPositionId: ''
parentTreatingProviderId: ''
parentReferredToId: ''
parentPrescriptionId: ''
parentVisitKindId: ''
parentGuidelineUsedId: ''
parentAuthorizationKindId: ''
parentAuthorizationStatusId: ''
parentBillId: ''
parentMedicalReportId: ''
parentPatientId: ''
parentCaseProcedureId: ''

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
WebUiFormField.date('referredOn', { label: 'Referred on' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('approvedOn', { label: 'Approved on' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('effectiveAsOf', { label: 'Effective as of' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.date('expiresOn', { label: 'Expires on' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.currency('duration', { label: 'Duration' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('procedureDescription', { label: 'Procedure Description' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.input('remarks', { label: 'Remarks' } , {className: 'w-full sm:w-1/2 md:w-1/4  px-1'} ),
WebUiFormField.checkbox('underwritingApproved', { label: 'Underwriting Approved' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('tpaApproved', { label: 'Tpa Approved' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.checkbox('requiresMedicalDirector', { label: 'Requires Medical Director' }, { className: 'w-full sm:w-1/2 md:w-1/4 px-1' }),
WebUiFormField.date('reviewedOn', { label: 'Reviewed on' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('priorAuthorizationNumber', { label: 'Prior Authorization Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('caseManager', { label: 'Case Manager' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('memberNumber', { label: 'Member Number' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('medicalDirector', { label: 'Medical Director' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('tpaApprover', { label: 'Tpa Approver' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('underwriter', { label: 'Underwriter' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
WebUiFormField.input('guidelineRequires', { label: 'Guideline Requires' }, {className: 'w-full sm:w-1/2 md:w-1/4  px-1'}),
,
,
,
,
,
,

    
  WebUiFormField.selectForm(
          'procedure-site',
          'procedureSiteId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          'clinical-provider',
          'treatingProviderId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('treatingProviderId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentTreatingProviderId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'clinical-provider',
          'referredToId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
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

  WebUiFormField.selectForm(
          'case-procedure',
          'caseProcedureId',
        {
          defaultValues: {}, ////Set Parent Values
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.route.params.pipe(pluck('caseProcedureId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentCaseProcedureId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
				])

  ]

  constructor(
    private readonly store: WebPriorAuthorizationRequestCreateStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }

  createPriorAuthorizationRequest(input) {

    if(this.parentProcedureSiteId != ''){
      input = {...input, procedureSiteId: this.parentProcedureSiteId} 
    }


    if(this.parentSurgicalPositionId != ''){
      input = {...input, surgicalPositionId: this.parentSurgicalPositionId} 
    }


    if(this.parentTreatingProviderId != ''){
      input = {...input, treatingProviderId: this.parentTreatingProviderId} 
    }


    if(this.parentReferredToId != ''){
      input = {...input, referredToId: this.parentReferredToId} 
    }


    if(this.parentPrescriptionId != ''){
      input = {...input, prescriptionId: this.parentPrescriptionId} 
    }


    if(this.parentVisitKindId != ''){
      input = {...input, visitKindId: this.parentVisitKindId} 
    }


    if(this.parentGuidelineUsedId != ''){
      input = {...input, guidelineUsedId: this.parentGuidelineUsedId} 
    }


    if(this.parentAuthorizationKindId != ''){
      input = {...input, authorizationKindId: this.parentAuthorizationKindId} 
    }


    if(this.parentAuthorizationStatusId != ''){
      input = {...input, authorizationStatusId: this.parentAuthorizationStatusId} 
    }


    if(this.parentBillId != ''){
      input = {...input, billId: this.parentBillId} 
    }


    if(this.parentMedicalReportId != ''){
      input = {...input, medicalReportId: this.parentMedicalReportId} 
    }


    if(this.parentPatientId != ''){
      input = {...input, patientId: this.parentPatientId} 
    }


    if(this.parentCaseProcedureId != ''){
      input = {...input, caseProcedureId: this.parentCaseProcedureId} 
    }


    this.store.createPriorAuthorizationRequestEffect(input)
  }
}
