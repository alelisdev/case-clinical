
import { ChangeDetectorRef, Component,EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { WebClaimProcedureFormStore } from './web-claim-procedure-form.store'
import { ClaimProcedure,PlaceOfService,ClaimStatus,Claim } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { map, pluck, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-claim-procedure-form',
  providers: [WebClaimProcedureFormStore],
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(claimProcedure))" [model]="claimProcedure ?? {}" [fields]="fields" [form]="form">
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
export class WebFormsUiClaimProcedureComponent
    {
  @Input() claimProcedure: ClaimProcedure = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({ })
  
  model: any = {}

 parentPlaceOfServiceId: ''
parentClaimStatusId: ''
parentClaimId: ''

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([

  WebUiFormField.selectForm(
          'place-of-service',
          'placeOfServiceId',
        {
          defaultValues: {}, ////Set Parent Values
          createPlaceOfService: (event) => {
            if(event?.name) {
              this.store.addPlaceOfService(event)
              this.model.placeOfServiceId = event.id
              this.form.controls['placeOfServiceId'].patchValue(event.id)
              this.form.controls['placeOfServiceId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterPlaceOfServices('').subscribe((values) => {
              this.model.placeOfServiceId = selected?.id
              this.form.controls['placeOfServiceId'].patchValue(selected?.id)
              this.form.controls['placeOfServiceId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Place Of Service',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterPlaceOfServices,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterPlaceOfServices('').subscribe()
              this.route.params.pipe(pluck('placeOfServiceId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentPlaceOfServiceId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'claim-status',
          'claimStatusId',
        {
          defaultValues: {}, ////Set Parent Values
          createClaimStatus: (event) => {
            if(event?.name) {
              this.store.addClaimStatus(event)
              this.model.claimStatusId = event.id
              this.form.controls['claimStatusId'].patchValue(event.id)
              this.form.controls['claimStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterClaimStatuses('').subscribe((values) => {
              this.model.claimStatusId = selected?.id
              this.form.controls['claimStatusId'].patchValue(selected?.id)
              this.form.controls['claimStatusId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Claim Status',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterClaimStatuses,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterClaimStatuses('').subscribe()
              this.route.params.pipe(pluck('claimStatusId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentClaimStatusId = s
                field.hide = true
              }
            })
          },
        }
      }
    )
,

  WebUiFormField.selectForm(
          'claim',
          'claimId',
        {
          defaultValues: {}, ////Set Parent Values
          createClaim: (event) => {
            if(event?.name) {
              this.store.addClaim(event)
              this.model.claimId = event.id
              this.form.controls['claimId'].patchValue(event.id)
              this.form.controls['claimId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            }
          },
          onChange: (selected) => {
            this.store.filterClaims('').subscribe((values) => {
              this.model.claimId = selected?.id
              this.form.controls['claimId'].patchValue(selected?.id)
              this.form.controls['claimId'].markAsDirty()
              this.ref.markForCheck()
              this.ref.detectChanges()
            })
          },
          label: 'Claim',
          valueProp: 'id',
          labelProp: 'name',
          source: this.store.filterClaims,
          debounceTime: 5
        },
        {
          className: 'w-full md:w-1/2 xl:w-1/4 px-1',
          hooks: {
            onInit: async (field) => {
              this.store.filterClaims('').subscribe()
              this.route.params.pipe(pluck('claimId')).subscribe((s) => {

              if (s != undefined || s != null) {
                this.parentClaimId = s
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
WebUiFormField.input('claimProcedureCodeId', { label: 'Claim Procedure Code Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('procedureCodeId', { label: 'Procedure Code Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.date('fromDateOfService', { label: 'From Date Of Service' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.date('toDateOfService', { label: 'To Date Of Service' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('nationalDrugCode', { label: 'National Drug Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('drugUnit', { label: 'Drug Unit' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('drugQuantity', { label: 'Drug Quantity' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.number('quantity', { label: 'Quantity' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('billedAmount', { label: 'Billed Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('approvedAmount', { label: 'Approved Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('adjustmentAmount', { label: 'Adjustment Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.currency('netPaymentAmount', { label: 'Net Payment Amount' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('paymentMethod', { label: 'Payment Method' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('internalMemo', { label: 'Internal Memo' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('explainationOfBenefitsComment', { label: 'Explaination Of Benefits Comment' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('reason', { label: 'Reason' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('procedureCode', { label: 'Procedure Code' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('diagnosisPointer', { label: 'Diagnosis Pointer' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('modifier1', { label: 'Modifier 1' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('modifier2', { label: 'Modifier 2' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('modifier3', { label: 'Modifier 3' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('modifier4', { label: 'Modifier 4' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'})				])

]

  constructor(
    private readonly store: WebClaimProcedureFormStore,
    private readonly route: ActivatedRoute,
    private readonly ref: ChangeDetectorRef
  ) {}


  async submit({ name,claimProcedureCodeId,procedureCodeId,claimId,fromDateOfService,toDateOfService,placeOfServiceId,nationalDrugCode,drugUnit,drugQuantity,quantity,billedAmount,approvedAmount,adjustmentAmount,netPaymentAmount,paymentMethod,internalMemo,explainationOfBenefitsComment,claimStatusId,reason,procedureCode,diagnosisPointer,modifier1,modifier2,modifier3,modifier4 }) {
    
    if(this.parentPlaceOfServiceId != ''){
      placeOfServiceId = this.parentPlaceOfServiceId
    }


    if(this.parentClaimStatusId != ''){
      claimStatusId = this.parentClaimStatusId
    }


    if(this.parentClaimId != ''){
      claimId = this.parentClaimId
    }

    await this.store.createClaimProcedureEffect({ name,claimProcedureCodeId,procedureCodeId,claimId,fromDateOfService,toDateOfService,placeOfServiceId,nationalDrugCode,drugUnit,drugQuantity,quantity,billedAmount,approvedAmount,adjustmentAmount,netPaymentAmount,paymentMethod,internalMemo,explainationOfBenefitsComment,claimStatusId,reason,procedureCode,diagnosisPointer,modifier1,modifier2,modifier3,modifier4 })

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
